
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useIsAdmin } from './useUserRole';
import { useNotifications } from './useNotifications';

export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string | null;
  content: string;
  message_type: 'user' | 'admin' | 'ai';
  is_read: boolean;
  created_at: string;
  sender_profile?: {
    full_name: string | null;
    avatar_url: string | null;
  };
}

export interface Conversation {
  id: string;
  user_id: string;
  title: string | null;
  status: 'active' | 'closed' | 'waiting_for_admin';
  last_message_at: string;
  created_at: string;
  updated_at: string;
  user_profile?: {
    full_name: string | null;
    avatar_url: string | null;
  };
}

export const useConversations = () => {
  const { user } = useAuth();
  const isAdmin = useIsAdmin();

  return useQuery({
    queryKey: ['conversations', user?.id, isAdmin],
    queryFn: async () => {
      if (!user) return [];
      
      let query = supabase.from('conversations').select('*');
      
      // If not admin, only get user's own conversations
      if (!isAdmin) {
        query = query.eq('user_id', user.id);
      }
      
      const { data, error } = await query.order('last_message_at', { ascending: false });

      if (error) throw error;
      
      // Fetch user profiles separately for each conversation
      const conversations = await Promise.all((data || []).map(async (conv) => {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, avatar_url')
          .eq('id', conv.user_id)
          .maybeSingle();
        
        return {
          ...conv,
          user_profile: profile || null
        };
      }));
      
      return conversations as Conversation[];
    },
    enabled: !!user,
  });
};

export const useMessages = (conversationId: string | null) => {
  const { sendNotification } = useNotifications();
  const isAdmin = useIsAdmin();

  useEffect(() => {
    if (!conversationId || !isAdmin) return;

    const channel = supabase
      .channel(`messages-${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        async (payload) => {
          const newMessage = payload.new as ChatMessage;
          
          // Only notify admin about user messages
          if (newMessage.message_type === 'user' && newMessage.sender_id) {
            // Fetch sender profile
            const { data: profile } = await supabase
              .from('profiles')
              .select('full_name')
              .eq('id', newMessage.sender_id)
              .single();

            sendNotification({
              title: 'New Chat Message',
              body: newMessage.content.substring(0, 100),
              type: 'chat',
              senderName: profile?.full_name || 'User'
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, isAdmin, sendNotification]);

  return useQuery({
    queryKey: ['messages', conversationId],
    queryFn: async () => {
      if (!conversationId) return [];
      
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      
      // Fetch sender profiles separately for each message
      const messages = await Promise.all((data || []).map(async (msg) => {
        let sender_profile = null;
        if (msg.sender_id) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, avatar_url')
            .eq('id', msg.sender_id)
            .maybeSingle();
          sender_profile = profile;
        }
        
        return {
          ...msg,
          sender_profile
        };
      }));
      
      return messages as ChatMessage[];
    },
    enabled: !!conversationId,
  });
};

export const useCreateConversation = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (title?: string) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('conversations')
        .insert({
          user_id: user.id,
          title: title || 'New Conversation',
          status: 'waiting_for_admin'
        })
        .select()
        .single();

      if (error) throw error;
      return data as Conversation;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const isAdmin = useIsAdmin();

  return useMutation({
    mutationFn: async ({ conversationId, content, messageType = 'user' }: {
      conversationId: string;
      content: string;
      messageType?: 'user' | 'admin' | 'ai';
    }) => {
      // Determine message type based on user role
      let finalMessageType = messageType;
      if (isAdmin && messageType === 'user') {
        finalMessageType = 'admin';
      }

      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          conversation_id: conversationId,
          content,
          message_type: finalMessageType,
          sender_id: finalMessageType !== 'ai' ? user?.id : null
        })
        .select()
        .single();

      if (error) throw error;
      return data as ChatMessage;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['messages', variables.conversationId] });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
};

export const useAIResponse = () => {
  return useMutation({
    mutationFn: async ({ message, conversationId, chatType }: { 
      message: string; 
      conversationId: string;
      chatType?: 'site-questions' | 'general' | null;
    }) => {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { message, conversationId, chatType }
      });

      if (error) throw error;
      return data;
    },
  });
};

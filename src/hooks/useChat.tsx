
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useIsAdmin } from './useUserRole';

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
      
      let query = supabase.from('conversations').select(`
        *,
        user_profile:profiles(
          full_name,
          avatar_url
        )
      `);
      
      // If not admin, only get user's own conversations
      if (!isAdmin) {
        query = query.eq('user_id', user.id);
      }
      
      const { data, error } = await query.order('last_message_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to match our interface
      const conversations = (data || []).map(conv => ({
        ...conv,
        user_profile: Array.isArray(conv.user_profile) ? conv.user_profile[0] : conv.user_profile
      }));
      
      return conversations as Conversation[];
    },
    enabled: !!user,
  });
};

export const useMessages = (conversationId: string | null) => {
  return useQuery({
    queryKey: ['messages', conversationId],
    queryFn: async () => {
      if (!conversationId) return [];
      
      const { data, error } = await supabase
        .from('chat_messages')
        .select(`
          *,
          sender_profile:profiles(
            full_name,
            avatar_url
          )
        `)
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      
      // Transform the data to match our interface
      const messages = (data || []).map(msg => ({
        ...msg,
        sender_profile: Array.isArray(msg.sender_profile) ? msg.sender_profile[0] : msg.sender_profile
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

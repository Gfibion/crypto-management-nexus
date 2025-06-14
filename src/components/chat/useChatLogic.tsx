
import { useState, useEffect, useRef } from 'react';
import { useMessages, useSendMessage, useAIResponse } from '@/hooks/useChat';
import { supabase } from '@/integrations/supabase/client';

export const useChatLogic = (conversationId: string) => {
  const [inputMessage, setInputMessage] = useState('');
  const [showAIPrompt, setShowAIPrompt] = useState(false);
  const [aiMode, setAiMode] = useState(false);
  const [lastHumanMessageTime, setLastHumanMessageTime] = useState<Date | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { data: messages = [], isLoading } = useMessages(conversationId);
  const sendMessage = useSendMessage();
  const getAIResponse = useAIResponse();

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Check for AI prompt after 1 hour of no human response
  useEffect(() => {
    if (messages.length === 0) return;

    const lastUserMessage = messages
      .filter(msg => msg.message_type === 'user')
      .pop();

    if (!lastUserMessage) return;

    const lastHumanResponse = messages
      .filter(msg => msg.message_type === 'admin' && new Date(msg.created_at) > new Date(lastUserMessage.created_at))
      .pop();

    if (!lastHumanResponse) {
      const messageTime = new Date(lastUserMessage.created_at);
      setLastHumanMessageTime(messageTime);
      
      const checkTime = () => {
        const now = new Date();
        const hoursSinceMessage = (now.getTime() - messageTime.getTime()) / (1000 * 60 * 60);
        
        if (hoursSinceMessage >= 1 && !aiMode) {
          setShowAIPrompt(true);
        }
      };

      const timer = setInterval(checkTime, 60000); // Check every minute
      checkTime(); // Check immediately

      return () => clearInterval(timer);
    }
  }, [messages, aiMode]);

  // Set up real-time subscriptions
  useEffect(() => {
    const channel = supabase
      .channel('chat-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        (payload) => {
          console.log('New message:', payload);
          // Query will auto-refresh due to real-time update
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const messageText = inputMessage;
    setInputMessage('');

    try {
      await sendMessage.mutateAsync({
        conversationId,
        content: messageText,
        messageType: 'user'
      });

      // If in AI mode, get AI response
      if (aiMode) {
        await getAIResponse.mutateAsync({
          message: messageText,
          conversationId
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleUseAI = () => {
    setAiMode(true);
    setShowAIPrompt(false);
  };

  const handleWaitForHuman = () => {
    setShowAIPrompt(false);
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const hours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    if (hours < 1) return 'less than an hour';
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  };

  return {
    inputMessage,
    setInputMessage,
    showAIPrompt,
    aiMode,
    lastHumanMessageTime,
    messagesEndRef,
    messages,
    isLoading,
    sendMessage,
    getAIResponse,
    handleSendMessage,
    handleKeyPress,
    handleUseAI,
    handleWaitForHuman,
    getTimeAgo,
  };
};

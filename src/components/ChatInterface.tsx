
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, User, Bot, Crown, Loader2 } from 'lucide-react';
import { useMessages, useSendMessage, useAIResponse } from '@/hooks/useChat';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import AIPrompt from './AIPrompt';

interface ChatInterfaceProps {
  conversationId: string;
  onBack: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ conversationId, onBack }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [showAIPrompt, setShowAIPrompt] = useState(false);
  const [aiMode, setAiMode] = useState(false);
  const [lastHumanMessageTime, setLastHumanMessageTime] = useState<Date | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
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

  const getMessageIcon = (messageType: string) => {
    switch (messageType) {
      case 'admin':
        return <Crown className="h-4 w-4 text-purple-600" />;
      case 'ai':
        return <Bot className="h-4 w-4 text-blue-600" />;
      default:
        return <User className="h-4 w-4 text-gray-600" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-purple-800/30">
        <Button variant="outline" onClick={onBack} size="sm">
          ← Back to Conversations
        </Button>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white">
            {aiMode ? 'AI Assistant Chat' : 'Live Chat Support'}
          </h3>
          {aiMode && (
            <p className="text-sm text-gray-400">AI responses • Human available soon</p>
          )}
        </div>
        <div></div>
      </div>

      {/* AI Prompt */}
      {showAIPrompt && lastHumanMessageTime && (
        <div className="p-4">
          <AIPrompt
            onUseAI={handleUseAI}
            onWaitForHuman={handleWaitForHuman}
            waitTime={getTimeAgo(lastHumanMessageTime)}
          />
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 mt-8">
            <h4 className="text-lg font-medium mb-2">Start a conversation</h4>
            <p>Send a message to begin chatting with our team</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.message_type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-lg ${
                  message.message_type === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : message.message_type === 'ai'
                    ? 'bg-blue-100 text-blue-900 border border-blue-200'
                    : 'bg-purple-100 text-purple-900 border border-purple-200'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  {getMessageIcon(message.message_type)}
                  <span className="text-xs font-medium">
                    {message.message_type === 'user' ? 'You' : 
                     message.message_type === 'ai' ? 'AI Assistant' : 'Support Team'}
                  </span>
                </div>
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-70 mt-2 block">
                  {new Date(message.created_at).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))
        )}
        
        {(sendMessage.isPending || getAIResponse.isPending) && (
          <div className="flex justify-start">
            <div className="bg-slate-700 text-gray-200 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">
                  {getAIResponse.isPending ? 'AI is typing...' : 'Sending...'}
                </span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-purple-800/30">
        <div className="flex space-x-4">
          <Input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 bg-slate-700 border border-purple-600/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || sendMessage.isPending}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;

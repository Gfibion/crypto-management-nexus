
import React from 'react';
import { ChatHeader } from './chat/ChatHeader';
import { MessagesList } from './chat/MessagesList';
import { ChatInput } from './chat/ChatInput';
import { AdminChatControls } from './chat/AdminChatControls';
import { useChatLogic } from './chat/useChatLogic';
import { useIsAdmin } from '@/hooks/useUserRole';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import AIPrompt from './AIPrompt';

interface ChatInterfaceProps {
  conversationId: string;
  onBack: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ conversationId, onBack }) => {
  const isAdmin = useIsAdmin();

  // Get conversation details for admin
  const { data: conversation } = useQuery({
    queryKey: ['conversation', conversationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('id', conversationId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!conversationId,
  });

  const {
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
  } = useChatLogic(conversationId);

  return (
    <div className="flex flex-col h-full">
      <ChatHeader 
        onBack={onBack} 
        aiMode={aiMode} 
        conversationStatus={conversation?.status}
      />

      {showAIPrompt && lastHumanMessageTime && !isAdmin && (
        <div className="p-4">
          <AIPrompt
            onUseAI={handleUseAI}
            onWaitForHuman={handleWaitForHuman}
            waitTime={getTimeAgo(lastHumanMessageTime)}
          />
        </div>
      )}

      <MessagesList
        messages={messages}
        isLoading={isLoading}
        sendMessagePending={sendMessage.isPending}
        getAIResponsePending={getAIResponse.isPending}
        messagesEndRef={messagesEndRef}
      />

      <ChatInput
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        onSendMessage={handleSendMessage}
        onKeyPress={handleKeyPress}
        isDisabled={!inputMessage.trim() || sendMessage.isPending}
      />

      {isAdmin && conversation && (
        <AdminChatControls 
          conversationId={conversationId}
          currentStatus={conversation.status}
        />
      )}
    </div>
  );
};

export default ChatInterface;

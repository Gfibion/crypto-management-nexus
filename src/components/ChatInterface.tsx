
import React from 'react';
import { ChatHeader } from './chat/ChatHeader';
import { MessagesList } from './chat/MessagesList';
import { ChatInput } from './chat/ChatInput';
import { useChatLogic } from './chat/useChatLogic';
import AIPrompt from './AIPrompt';

interface ChatInterfaceProps {
  conversationId: string;
  onBack: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ conversationId, onBack }) => {
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
      <ChatHeader onBack={onBack} aiMode={aiMode} />

      {showAIPrompt && lastHumanMessageTime && (
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
    </div>
  );
};

export default ChatInterface;

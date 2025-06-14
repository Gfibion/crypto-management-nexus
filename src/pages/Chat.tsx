import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, Lock } from "lucide-react";
import { useGuestMode } from "@/hooks/useGuestMode";
import GuestModePrompt from "@/components/GuestModePrompt";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const Chat = () => {
  const { requireAuth, showPrompt, closePrompt, pendingAction, isAuthenticated } = useGuestMode();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    if (!requireAuth('send a message')) return;
    
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thanks for your message! This is a demo response. In a real implementation, this would connect to an AI service.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI Assistant
          </h1>
          <p className="text-xl text-gray-300">
            Get instant answers and assistance
          </p>
        </div>

        {/* Chat Container */}
        <Card className="bg-slate-800/50 border-purple-800/30 h-[600px] flex flex-col">
          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-lg ${
                    message.isUser
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'bg-slate-700 text-gray-200'
                  }`}
                >
                  <p>{message.content}</p>
                  <span className="text-xs opacity-70 mt-2 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-700 text-gray-200 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="animate-pulse">●</div>
                    <div className="animate-pulse delay-100">●</div>
                    <div className="animate-pulse delay-200">●</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-6 border-t border-purple-800/30">
            <div className="flex space-x-4">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isAuthenticated ? "Type your message..." : "Sign in to send messages..."}
                disabled={!isAuthenticated}
                className="flex-1 bg-slate-700 border border-purple-600/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 disabled:opacity-50"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading || !isAuthenticated}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            {!isAuthenticated && (
              <p className="text-sm text-gray-400 mt-2 flex items-center">
                <Lock className="h-4 w-4 mr-1" />
                Please sign in to use the chat feature
              </p>
            )}
          </div>
        </Card>

        <GuestModePrompt 
          isOpen={showPrompt} 
          onClose={closePrompt} 
          actionName={pendingAction} 
        />
      </div>
    </div>
  );
};

export default Chat;

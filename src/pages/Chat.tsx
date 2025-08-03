
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MessageCircle, Clock, Loader2, Star } from "lucide-react";
import { useGuestMode } from "@/hooks/useGuestMode";
import { useConversations, useCreateConversation } from "@/hooks/useChat";
import GuestModePrompt from "@/components/GuestModePrompt";
import ChatInterface from "@/components/ChatInterface";
import ConversationActions from "@/components/chat/ConversationActions";

const Chat = () => {
  const { requireAuth, showPrompt, closePrompt, pendingAction, isAuthenticated } = useGuestMode();
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  
  const { data: conversations = [], isLoading } = useConversations();
  const createConversation = useCreateConversation();

  const handleStartNewChat = async () => {
    if (!requireAuth('start a new conversation')) return;
    
    try {
      const newConversation = await createConversation.mutateAsync('New Conversation');
      setSelectedConversationId(newConversation.id);
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  const handleSelectConversation = (conversationId: string) => {
    if (!requireAuth('view conversation')) return;
    setSelectedConversationId(conversationId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'waiting_for_admin': return 'text-yellow-400';
      case 'closed': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'waiting_for_admin': return 'Waiting for response';
      case 'closed': return 'Closed';
      default: return status;
    }
  };

  if (selectedConversationId) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-4xl mx-auto h-[calc(100vh-6rem)]">
          <Card className="bg-slate-800/50 border-purple-800/30 h-full flex flex-col">
            <ChatInterface 
              conversationId={selectedConversationId}
              onBack={() => setSelectedConversationId(null)}
            />
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Live Chat Support
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Get direct help from our team or AI assistant
          </p>
          
          <Button
            onClick={handleStartNewChat}
            disabled={!isAuthenticated || createConversation.isPending}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg"
          >
            {createConversation.isPending ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Starting...
              </>
            ) : (
              <>
                <Plus className="h-5 w-5 mr-2" />
                Start New Conversation
              </>
            )}
          </Button>
        </div>

        {/* Authentication Notice */}
        {!isAuthenticated && (
          <Card className="bg-yellow-900/20 border-yellow-600/30 p-6 mb-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">
                Sign in required
              </h3>
              <p className="text-yellow-200">
                Please sign in to start chatting with our support team
              </p>
            </div>
          </Card>
        )}

        {/* Existing Conversations */}
        {isAuthenticated && (
          <Card className="bg-slate-800/50 border-purple-800/30 p-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <MessageCircle className="h-6 w-6 mr-2" />
              Your Conversations
            </h2>

            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
                <span className="ml-2 text-gray-300">Loading conversations...</span>
              </div>
            ) : conversations.length === 0 ? (
              <div className="text-center py-8">
                <MessageCircle className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-300 mb-2">
                  No conversations yet
                </h3>
                <p className="text-gray-400">
                  Start your first conversation to get help from our team
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => handleSelectConversation(conversation.id)}
                    className="p-4 bg-slate-700/50 border border-purple-600/30 rounded-lg cursor-pointer hover:bg-slate-700/70 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-white mb-1">
                          {conversation.title || 'Untitled Conversation'}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span className={getStatusColor(conversation.status)}>
                            ● {getStatusText(conversation.status)}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {new Date(conversation.last_message_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <ConversationActions 
                          conversationId={conversation.id}
                        />
                        <div className="text-purple-400">→</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}

        {/* Features Info */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card className="bg-slate-800/30 border-purple-800/30 p-6">
            <h3 className="text-xl font-semibold text-white mb-3">
              💬 Human Support
            </h3>
            <p className="text-gray-300">
              Chat directly with our business consultants for personalized advice and detailed guidance.
            </p>
          </Card>
          
          <Card className="bg-slate-800/30 border-purple-800/30 p-6">
            <h3 className="text-xl font-semibold text-white mb-3">
              🤖 AI Assistant
            </h3>
            <p className="text-gray-300">
              Get instant answers to common questions. If we don't respond within an hour, our AI assistant will offer to help.
            </p>
          </Card>
        </div>

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

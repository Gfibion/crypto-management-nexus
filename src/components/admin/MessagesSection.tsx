
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Mail, MailOpen, Trash2, Reply } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MessagesSectionProps {
  setActiveTab: (tab: 'dashboard' | 'articles' | 'messages' | 'content') => void;
}

const MessagesSection: React.FC<MessagesSectionProps> = ({ setActiveTab }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch contact messages
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['contact-messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  // Mark message as read
  const markAsRead = useMutation({
    mutationFn: async (messageId: string) => {
      const { error } = await supabase
        .from('contact_messages')
        .update({ read: true })
        .eq('id', messageId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
      toast({
        title: "Success",
        description: "Message marked as read",
      });
    },
  });

  // Delete message
  const deleteMessage = useMutation({
    mutationFn: async (messageId: string) => {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', messageId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
      toast({
        title: "Success",
        description: "Message deleted successfully",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-white">Loading messages...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          onClick={() => setActiveTab('dashboard')}
          className="border-purple-600/30 text-purple-300"
        >
          ← Back to Dashboard
        </Button>
        <h2 className="text-2xl font-bold text-white">Contact Messages</h2>
      </div>

      <div className="grid gap-6">
        {messages.map((message) => (
          <Card key={message.id} className="bg-slate-800/50 border-purple-800/30">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <CardTitle className="text-lg text-white">
                      {message.subject || 'No Subject'}
                    </CardTitle>
                    {!message.read && (
                      <Badge className="bg-blue-600">New</Badge>
                    )}
                    {message.replied && (
                      <Badge variant="outline" className="border-green-400 text-green-400">
                        Replied
                      </Badge>
                    )}
                  </div>
                  
                  <div className="text-sm text-gray-300 mb-3">
                    From: {message.name} ({message.email})
                  </div>
                  
                  <div className="text-gray-300 mb-3">
                    {message.message}
                  </div>

                  <div className="text-sm text-gray-400">
                    Received: {new Date(message.created_at).toLocaleString()}
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  {!message.read && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => markAsRead.mutate(message.id)}
                      disabled={markAsRead.isPending}
                      className="border-blue-600/30 text-blue-300 hover:bg-blue-600/20"
                    >
                      <MailOpen className="h-4 w-4" />
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`mailto:${message.email}?subject=Re: ${message.subject || 'Your message'}`)}
                    className="border-green-600/30 text-green-300 hover:bg-green-600/20"
                  >
                    <Reply className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteMessage.mutate(message.id)}
                    disabled={deleteMessage.isPending}
                    className="border-red-600/30 text-red-300 hover:bg-red-600/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}

        {messages.length === 0 && (
          <Card className="bg-slate-800/50 border-purple-800/30 p-12 text-center">
            <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-4">No Messages</h3>
            <p className="text-gray-300">No contact messages have been received yet.</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MessagesSection;

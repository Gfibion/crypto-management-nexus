
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Mail, MailOpen, Trash2, Reply } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MessagesSectionProps {
  setActiveTab: (tab: 'dashboard' | 'articles' | 'messages' | 'content' | 'users' | 'emails') => void;
}

const MessagesSection: React.FC<MessagesSectionProps> = ({ setActiveTab }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [replyMessage, setReplyMessage] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

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

  // Send reply email
  const sendReply = useMutation({
    mutationFn: async ({ messageId, to, subject, message }: { 
      messageId: string; 
      to: string; 
      subject: string; 
      message: string; 
    }) => {
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: { 
          messageId, 
          to, 
          subject, 
          message,
          emailType: 'reply',
          recipientName: messages.find(m => m.id === messageId)?.name 
        }
      });
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
      setReplyMessage('');
      setReplyingTo(null);
      toast({
        title: "Success",
        description: "Reply sent successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error", 
        description: "Failed to send reply",
        variant: "destructive",
      });
    }
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
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setReplyingTo(message.id)}
                        className="border-green-600/30 text-green-300 hover:bg-green-600/20"
                      >
                        <Reply className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-800 border-purple-800/30">
                      <DialogHeader>
                        <DialogTitle className="text-white">
                          Reply to {message.name}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="text-sm text-gray-300">
                          <strong>To:</strong> {message.email}<br/>
                          <strong>Subject:</strong> Re: {message.subject || 'Your message'}
                        </div>
                        <Textarea
                          placeholder="Type your reply here..."
                          value={replyMessage}
                          onChange={(e) => setReplyMessage(e.target.value)}
                          className="bg-slate-700/50 border-purple-600/30 text-white min-h-32"
                        />
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setReplyMessage('');
                              setReplyingTo(null);
                            }}
                            className="border-gray-600"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={() => sendReply.mutate({
                              messageId: message.id,
                              to: message.email,
                              subject: `Re: ${message.subject || 'Your message'}`,
                              message: replyMessage
                            })}
                            disabled={!replyMessage.trim() || sendReply.isPending}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            {sendReply.isPending ? 'Sending...' : 'Send Reply'}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
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

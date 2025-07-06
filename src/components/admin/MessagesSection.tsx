
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { MessageSquare, Reply, Trash2, Check, Eye, Mail, Phone, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface MessagesSectionProps {
  setActiveTab: (tab: 'dashboard' | 'messages') => void;
}

const MessagesSection: React.FC<MessagesSectionProps> = ({ setActiveTab }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [replyingTo, setReplyingTo] = useState<any>(null);
  const [replyMessage, setReplyMessage] = useState('');

  // Fetch contact messages
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['admin-contact-messages'],
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
      queryClient.invalidateQueries({ queryKey: ['admin-contact-messages'] });
      toast({
        title: "Success",
        description: "Message marked as read",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to mark message as read",
        variant: "destructive",
      });
    },
  });

  // Reply to message
  const replyToMessage = useMutation({
    mutationFn: async ({ messageId, replyContent }: { messageId: string; replyContent: string }) => {
      // Update the message as replied
      const { error: updateError } = await supabase
        .from('contact_messages')
        .update({ replied: true, read: true })
        .eq('id', messageId);
      
      if (updateError) throw updateError;

      // Log the email (in a real app, you'd send the actual email here)
      const message = messages.find(m => m.id === messageId);
      if (message) {
        const { error: logError } = await supabase
          .from('email_logs')
          .insert({
            recipient_email: message.email,
            recipient_name: message.name,
            subject: `Re: ${message.subject || 'Your Message'}`,
            message: replyContent,
            email_type: 'reply',
            status: 'sent',
            sent_at: new Date().toISOString(),
            sender_id: user?.id
          });
        
        if (logError) console.error('Failed to log email:', logError);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-contact-messages'] });
      queryClient.invalidateQueries({ queryKey: ['email-logs'] });
      setReplyingTo(null);
      setReplyMessage('');
      toast({
        title: "Success",
        description: "Reply sent successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send reply",
        variant: "destructive",
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
      queryClient.invalidateQueries({ queryKey: ['admin-contact-messages'] });
      toast({
        title: "Success",
        description: "Message deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete message",
        variant: "destructive",
      });
    },
  });

  const handleReply = () => {
    if (!replyingTo || !replyMessage.trim()) return;
    
    replyToMessage.mutate({
      messageId: replyingTo.id,
      replyContent: replyMessage.trim()
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-white">Loading messages...</div>
      </div>
    );
  }

  const unreadCount = messages.filter(m => !m.read).length;
  const repliedCount = messages.filter(m => m.replied).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          onClick={() => setActiveTab('dashboard')}
          className="border-purple-600/30 text-purple-300 hover:bg-purple-600/20"
        >
          ← Back to Dashboard
        </Button>
        <h2 className="text-2xl font-bold text-white">Contact Messages</h2>
      </div>

      {/* Message Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-800/50 border-purple-600/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-8 w-8 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-white">{messages.length}</p>
                <p className="text-gray-300 text-sm">Total Messages</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-red-600/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Eye className="h-8 w-8 text-red-400" />
              <div>
                <p className="text-2xl font-bold text-white">{unreadCount}</p>
                <p className="text-gray-300 text-sm">Unread Messages</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-green-600/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Reply className="h-8 w-8 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-white">{repliedCount}</p>
                <p className="text-gray-300 text-sm">Replied Messages</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {messages.map((message) => (
          <Card 
            key={message.id} 
            className={`bg-slate-800/50 transition-all duration-300 hover:shadow-lg ${
              !message.read 
                ? 'border-red-600/40 shadow-red-500/10' 
                : 'border-purple-600/20'
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">
                      {message.name}
                    </h3>
                    <div className="flex gap-2">
                      {!message.read && (
                        <Badge className="bg-red-600 text-white">New</Badge>
                      )}
                      {message.replied && (
                        <Badge className="bg-green-600 text-white">Replied</Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-300 mb-3">
                    <div className="flex items-center space-x-1">
                      <Mail className="h-4 w-4" />
                      <span>{message.email}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(message.created_at).toLocaleString()}</span>
                    </div>
                  </div>

                  {message.subject && (
                    <p className="text-purple-300 font-medium mb-2">
                      Subject: {message.subject}
                    </p>
                  )}
                  
                  <p className="text-gray-300 leading-relaxed">
                    {message.message}
                  </p>
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
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setReplyingTo(message)}
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
            <MessageSquare className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-4">No Messages Found</h3>
            <p className="text-gray-300">No contact messages have been received yet.</p>
          </Card>
        )}
      </div>

      {/* Reply Dialog */}
      <Dialog open={!!replyingTo} onOpenChange={(open) => !open && setReplyingTo(null)}>
        <DialogContent className="bg-slate-800 border-purple-800/30 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">
              Reply to {replyingTo?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-slate-700/50 p-4 rounded-lg">
              <p className="text-gray-300 text-sm mb-2">Replying to:</p>
              <p className="text-white font-medium">{replyingTo?.subject || 'No Subject'}</p>
              <p className="text-gray-300 text-sm mt-1">{replyingTo?.email}</p>
            </div>
            
            <Textarea
              placeholder="Type your reply message..."
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              className="bg-slate-700/50 border-purple-600/30 text-white min-h-[120px]"
            />
            
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setReplyingTo(null)}
                className="border-gray-600 text-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleReply}
                disabled={!replyMessage.trim() || replyToMessage.isPending}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                {replyToMessage.isPending ? 'Sending...' : 'Send Reply'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessagesSection;

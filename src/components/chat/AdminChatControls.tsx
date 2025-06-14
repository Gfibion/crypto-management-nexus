
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface AdminChatControlsProps {
  conversationId: string;
  currentStatus: string;
}

export const AdminChatControls: React.FC<AdminChatControlsProps> = ({ 
  conversationId, 
  currentStatus 
}) => {
  const queryClient = useQueryClient();

  const updateStatus = useMutation({
    mutationFn: async (newStatus: string) => {
      const { error } = await supabase
        .from('conversations')
        .update({ status: newStatus })
        .eq('id', conversationId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'closed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-slate-800/30 border-t border-purple-800/30">
      <div className="flex items-center space-x-2">
        {getStatusIcon(currentStatus)}
        <span className="text-sm text-gray-300">Status:</span>
      </div>
      
      <Select value={currentStatus} onValueChange={(value) => updateStatus.mutate(value)}>
        <SelectTrigger className="w-40 bg-slate-700 border-purple-600/30">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="waiting_for_admin">Waiting</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="closed">Closed</SelectItem>
        </SelectContent>
      </Select>

      <Button
        onClick={() => updateStatus.mutate('closed')}
        disabled={currentStatus === 'closed' || updateStatus.isPending}
        variant="outline"
        size="sm"
        className="border-red-600/30 text-red-300 hover:bg-red-600/20"
      >
        Close Chat
      </Button>
    </div>
  );
};

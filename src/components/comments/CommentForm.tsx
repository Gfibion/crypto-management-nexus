
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/useAuth';
import { useGuestMode } from '@/hooks/useGuestMode';
import { useCommentOperations } from '@/hooks/useComments';

interface CommentFormProps {
  articleId: string;
  placeholder?: string;
  onSuccess?: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ 
  articleId, 
  placeholder = "Share your thoughts...",
  onSuccess
}) => {
  const { user } = useAuth();
  const { requireAuth } = useGuestMode();
  const { createComment } = useCommentOperations();
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    if (!user) {
      requireAuth('post a comment');
      return;
    }
    
    if (!content.trim()) return;
    
    await createComment.mutateAsync({
      articleId,
      content: content.trim()
    });
    
    setContent('');
    onSuccess?.();
  };

  return (
    <div className="space-y-3">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={user ? placeholder : "Sign in to post a comment"}
        disabled={!user}
        className="bg-slate-700/50 border-purple-600/30 text-white placeholder-gray-400"
        rows={3}
      />
      <Button
        onClick={handleSubmit}
        disabled={!content.trim() || createComment.isPending}
        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
      >
        <Send className="h-4 w-4 mr-2" />
        Post Comment
      </Button>
    </div>
  );
};

export default CommentForm;

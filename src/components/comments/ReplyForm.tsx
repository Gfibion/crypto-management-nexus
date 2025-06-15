
import React, { useState } from 'react';
import { Reply } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useCommentOperations } from '@/hooks/useComments';

interface ReplyFormProps {
  articleId: string;
  parentId: string;
  onCancel: () => void;
  onSuccess: () => void;
}

const ReplyForm: React.FC<ReplyFormProps> = ({ 
  articleId, 
  parentId, 
  onCancel, 
  onSuccess 
}) => {
  const { user } = useAuth();
  const { createComment } = useCommentOperations();
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    if (!user || !content.trim()) return;
    
    await createComment.mutateAsync({
      articleId,
      content: content.trim(),
      parentId
    });
    
    setContent('');
    onSuccess();
  };

  return (
    <Card className="bg-slate-700/50 border-purple-600/30">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-purple-400">Replying to comment</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="text-gray-400 hover:text-white"
          >
            Cancel
          </Button>
        </div>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your reply..."
          className="bg-slate-600/50 border-purple-600/30"
          rows={2}
        />
        <Button
          onClick={handleSubmit}
          disabled={!content.trim() || createComment.isPending}
          size="sm"
          className="bg-gradient-to-r from-purple-600 to-blue-600"
        >
          <Reply className="h-4 w-4 mr-2" />
          Reply
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReplyForm;

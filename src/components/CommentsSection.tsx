
import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useComments } from '@/hooks/useComments';
import LoadingSpinner from './LoadingSpinner';
import CommentItem from './comments/CommentItem';
import CommentForm from './comments/CommentForm';
import ReplyForm from './comments/ReplyForm';

interface CommentsSectionProps {
  articleId: string;
  onClose?: () => void;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ articleId, onClose }) => {
  const { data: comments, isLoading } = useComments(articleId);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) {
    return null;
  }

  if (isLoading) {
    return <LoadingSpinner message="Loading comments..." />;
  }

  return (
    <Card className="bg-slate-800/50 border-purple-800/30 mt-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-white">
            <MessageSquare className="h-5 w-5" />
            Comments ({comments?.length || 0})
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* New Comment Form */}
        <CommentForm articleId={articleId} />

        {/* Comments List */}
        <div className="space-y-4">
          {comments?.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              articleId={articleId}
              onReply={setReplyingTo}
            />
          ))}
          
          {comments?.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No comments yet. Be the first to share your thoughts!</p>
            </div>
          )}
        </div>

        {/* Reply Form */}
        {replyingTo && (
          <ReplyForm
            articleId={articleId}
            parentId={replyingTo}
            onCancel={() => setReplyingTo(null)}
            onSuccess={() => setReplyingTo(null)}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default CommentsSection;

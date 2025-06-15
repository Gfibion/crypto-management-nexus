
import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useComments } from '@/hooks/useComments';
import LoadingSpinner from './LoadingSpinner';
import CommentItem from './comments/CommentItem';
import CommentForm from './comments/CommentForm';
import ReplyForm from './comments/ReplyForm';

interface CommentsSectionProps {
  articleId: string;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ articleId }) => {
  const { data: comments, isLoading } = useComments(articleId);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  if (isLoading) {
    return <LoadingSpinner message="Loading comments..." />;
  }

  return (
    <Card className="bg-slate-800/50 border-purple-800/30 mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <MessageSquare className="h-5 w-5" />
          Comments ({comments?.length || 0})
        </CardTitle>
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

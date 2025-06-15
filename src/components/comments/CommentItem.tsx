
import React from 'react';
import { Heart, Reply } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { useGuestMode } from '@/hooks/useGuestMode';
import { useCommentOperations } from '@/hooks/useComments';

interface CommentItemProps {
  comment: {
    id: string;
    content: string;
    created_at: string;
    profiles: {
      full_name: string | null;
      avatar_url: string | null;
    } | null;
    comment_likes: Array<{ user_id: string }>;
    replies: any[];
    like_count: number;
  };
  articleId: string;
  onReply: (commentId: string) => void;
  depth?: number;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, articleId, onReply, depth = 0 }) => {
  const { user } = useAuth();
  const { requireAuth } = useGuestMode();
  const { toggleCommentLike } = useCommentOperations();

  const handleLike = () => {
    if (!user) {
      requireAuth('like this comment');
      return;
    }
    toggleCommentLike.mutate({ commentId: comment.id });
  };

  const userHasLiked = comment.comment_likes?.some((like: any) => like.user_id === user?.id);
  const maxDepth = 3;

  return (
    <div className={`${depth > 0 ? 'ml-8 mt-4' : 'mt-4'}`}>
      <div className="flex gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={comment.profiles?.avatar_url || undefined} />
          <AvatarFallback>
            {comment.profiles?.full_name?.charAt(0) || 'U'}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-2">
          <div className="bg-slate-700/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-white text-sm">
                {comment.profiles?.full_name || 'Anonymous'}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(comment.created_at).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-300 text-sm">{comment.content}</p>
          </div>
          
          <div className="flex items-center gap-4 text-xs">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`h-6 px-2 text-xs ${
                userHasLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
              }`}
            >
              <Heart className={`h-3 w-3 mr-1 ${userHasLiked ? 'fill-current' : ''}`} />
              {comment.like_count || 0}
            </Button>
            
            {depth < maxDepth && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onReply(comment.id)}
                className="h-6 px-2 text-xs text-gray-400 hover:text-purple-400"
              >
                <Reply className="h-3 w-3 mr-1" />
                Reply
              </Button>
            )}
          </div>
          
          {comment.replies?.map((reply: any) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              articleId={articleId}
              onReply={onReply}
              depth={depth + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;

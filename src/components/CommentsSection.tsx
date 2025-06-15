
import React, { useState } from 'react';
import { MessageSquare, Heart, Reply, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useComments, useCommentOperations } from '@/hooks/useComments';
import { useAuth } from '@/hooks/useAuth';
import { useGuestMode } from '@/hooks/useGuestMode';
import LoadingSpinner from './LoadingSpinner';

interface CommentsSectionProps {
  articleId: string;
}

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

const CommentsSection: React.FC<CommentsSectionProps> = ({ articleId }) => {
  const { user } = useAuth();
  const { requireAuth } = useGuestMode();
  const { data: comments, isLoading } = useComments(articleId);
  const { createComment } = useCommentOperations();
  
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handleSubmitComment = async () => {
    if (!user) {
      requireAuth('post a comment');
      return;
    }
    
    if (!newComment.trim()) return;
    
    await createComment.mutateAsync({
      articleId,
      content: newComment.trim()
    });
    
    setNewComment('');
  };

  const handleSubmitReply = async () => {
    if (!user || !replyingTo) return;
    if (!replyContent.trim()) return;
    
    await createComment.mutateAsync({
      articleId,
      content: replyContent.trim(),
      parentId: replyingTo
    });
    
    setReplyContent('');
    setReplyingTo(null);
  };

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
        <div className="space-y-3">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={user ? "Share your thoughts..." : "Sign in to post a comment"}
            disabled={!user}
            className="bg-slate-700/50 border-purple-600/30 text-white placeholder-gray-400"
            rows={3}
          />
          <Button
            onClick={handleSubmitComment}
            disabled={!newComment.trim() || createComment.isPending}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Send className="h-4 w-4 mr-2" />
            Post Comment
          </Button>
        </div>

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
          <Card className="bg-slate-700/50 border-purple-600/30">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-purple-400">Replying to comment</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setReplyingTo(null)}
                  className="text-gray-400 hover:text-white"
                >
                  Cancel
                </Button>
              </div>
              <Textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write your reply..."
                className="bg-slate-600/50 border-purple-600/30"
                rows={2}
              />
              <Button
                onClick={handleSubmitReply}
                disabled={!replyContent.trim() || createComment.isPending}
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-blue-600"
              >
                <Reply className="h-4 w-4 mr-2" />
                Reply
              </Button>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default CommentsSection;


import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useArticleLikes, useUserArticleLike, useArticleLikeOperations } from '@/hooks/useArticleInteractions';
import { useAuth } from '@/hooks/useAuth';
import { useGuestMode } from '@/hooks/useGuestMode';

interface ArticleLikesProps {
  articleId: string;
}

const ArticleLikes: React.FC<ArticleLikesProps> = ({ articleId }) => {
  const { user } = useAuth();
  const { requireAuth } = useGuestMode();
  const { data: likesData, isLoading } = useArticleLikes(articleId);
  const { data: userLike } = useUserArticleLike(articleId);
  const { toggleLike } = useArticleLikeOperations();

  const handleLike = (isLike: boolean) => {
    if (!user) {
      requireAuth(isLike ? 'like this article' : 'dislike this article');
      return;
    }
    
    toggleLike.mutate({ articleId, isLike });
  };

  if (isLoading) return null;

  const { likes = 0, dislikes = 0 } = likesData || {};
  const userHasLiked = userLike?.is_like === true;
  const userHasDisliked = userLike?.is_like === false;

  return (
    <div className="flex items-center gap-4 py-4 border-t border-gray-700">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleLike(true)}
          className={`border-green-500/30 hover:bg-green-500/20 ${
            userHasLiked ? 'bg-green-500/20 text-green-400' : 'text-green-500'
          }`}
          disabled={toggleLike.isPending}
        >
          <ThumbsUp className="h-4 w-4 mr-1" />
          {likes}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleLike(false)}
          className={`border-red-500/30 hover:bg-red-500/20 ${
            userHasDisliked ? 'bg-red-500/20 text-red-400' : 'text-red-500'
          }`}
          disabled={toggleLike.isPending}
        >
          <ThumbsDown className="h-4 w-4 mr-1" />
          {dislikes}
        </Button>
      </div>
      
      <span className="text-sm text-gray-400">
        Was this article helpful? Please comment.
      </span>
    </div>
  );
};

export default ArticleLikes;

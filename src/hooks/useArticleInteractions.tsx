
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export const useArticleLikes = (articleId: string) => {
  return useQuery({
    queryKey: ['article-likes', articleId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('article_likes')
        .select('is_like, user_id')
        .eq('article_id', articleId);
      
      if (error) throw error;
      
      const likes = data.filter(like => like.is_like).length;
      const dislikes = data.filter(like => !like.is_like).length;
      
      return { likes, dislikes, data };
    },
  });
};

export const useUserArticleLike = (articleId: string) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['user-article-like', articleId, user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('article_likes')
        .select('is_like')
        .eq('article_id', articleId)
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
};

export const useArticleLikeOperations = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { user } = useAuth();

  const toggleLike = useMutation({
    mutationFn: async ({ articleId, isLike }: { articleId: string; isLike: boolean }) => {
      if (!user) throw new Error('User must be authenticated');

      const { data: existing } = await supabase
        .from('article_likes')
        .select('is_like')
        .eq('article_id', articleId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (existing) {
        if (existing.is_like === isLike) {
          // Remove the like/dislike
          const { error } = await supabase
            .from('article_likes')
            .delete()
            .eq('article_id', articleId)
            .eq('user_id', user.id);
          if (error) throw error;
        } else {
          // Update the like/dislike
          const { error } = await supabase
            .from('article_likes')
            .update({ is_like: isLike })
            .eq('article_id', articleId)
            .eq('user_id', user.id);
          if (error) throw error;
        }
      } else {
        // Create new like/dislike
        const { error } = await supabase
          .from('article_likes')
          .insert([{
            article_id: articleId,
            user_id: user.id,
            is_like: isLike
          }]);
        if (error) throw error;
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['article-likes', variables.articleId] });
      queryClient.invalidateQueries({ queryKey: ['user-article-like', variables.articleId] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update like status",
        variant: "destructive",
      });
    },
  });

  return { toggleLike };
};

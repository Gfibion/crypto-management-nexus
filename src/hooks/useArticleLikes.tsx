import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNotifications } from './useNotifications';
import { useIsAdmin } from './useUserRole';

export const useArticleLikesNotifications = (articleId: string | undefined) => {
  const { sendNotification } = useNotifications();
  const isAdmin = useIsAdmin();

  useEffect(() => {
    if (!articleId || !isAdmin) return;

    const channel = supabase
      .channel(`article-likes-${articleId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'article_likes',
          filter: `article_id=eq.${articleId}`
        },
        async (payload) => {
          const newLike = payload.new as any;
          
          // Fetch user profile and article
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', newLike.user_id)
            .single();

          const { data: article } = await supabase
            .from('articles')
            .select('title')
            .eq('id', newLike.article_id)
            .single();

          sendNotification({
            title: 'New Like',
            body: `"${article?.title}"`,
            type: 'like',
            senderName: profile?.full_name || 'User'
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [articleId, isAdmin, sendNotification]);
};

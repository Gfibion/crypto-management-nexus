import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useNotifications } from '@/hooks/useNotifications';
import { useIsAdmin } from '@/hooks/useUserRole';
import { useEffect } from 'react';

interface CommentWithExtras {
  id: string;
  article_id: string;
  user_id: string;
  content: string;
  parent_id: string | null;
  created_at: string;
  updated_at: string;
  profiles: {
    full_name: string | null;
    avatar_url: string | null;
  } | null;
  comment_likes: Array<{ user_id: string }>;
  replies: CommentWithExtras[];
  like_count: number;
}

export const useComments = (articleId: string) => {
  const { sendNotification } = useNotifications();
  const isAdmin = useIsAdmin();

  useEffect(() => {
    if (!articleId || !isAdmin) return;

    const channel = supabase
      .channel(`comments-${articleId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'comments',
          filter: `article_id=eq.${articleId}`
        },
        async (payload) => {
          const newComment = payload.new as any;
          
          // Fetch user profile and article
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', newComment.user_id)
            .single();

          const { data: article } = await supabase
            .from('articles')
            .select('title')
            .eq('id', newComment.article_id)
            .single();

          sendNotification({
            title: 'New Comment',
            body: `On "${article?.title}": ${newComment.content.substring(0, 80)}`,
            type: 'comment',
            senderName: profile?.full_name || 'User'
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [articleId, isAdmin, sendNotification]);

  return useQuery({
    queryKey: ['comments', articleId],
    queryFn: async () => {
      // First fetch comments
      const { data: commentsData, error: commentsError } = await supabase
        .from('comments')
        .select(`
          *,
          comment_likes (
            user_id
          )
        `)
        .eq('article_id', articleId)
        .order('created_at', { ascending: true });
      
      if (commentsError) {
        console.error('Error fetching comments:', commentsError);
        throw commentsError;
      }

      // Get unique user IDs from comments
      const userIds = [...new Set(commentsData.map(comment => comment.user_id))];
      
      // Fetch profiles for these users
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .in('id', userIds);
      
      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
      }

      // Create a map of profiles for easy lookup
      const profilesMap = new Map();
      profilesData?.forEach(profile => {
        profilesMap.set(profile.id, profile);
      });
      
      // Organize comments into a tree structure
      const commentMap = new Map<string, CommentWithExtras>();
      const rootComments: CommentWithExtras[] = [];
      
      // First pass: create all comment objects with extended properties
      commentsData.forEach(comment => {
        const profile = profilesMap.get(comment.user_id);
        const commentWithExtras: CommentWithExtras = {
          ...comment,
          replies: [],
          like_count: comment.comment_likes?.length || 0,
          profiles: profile ? {
            full_name: profile.full_name,
            avatar_url: profile.avatar_url
          } : null,
        };
        commentMap.set(comment.id, commentWithExtras);
      });
      
      // Second pass: organize into tree structure
      commentsData.forEach(comment => {
        const commentWithExtras = commentMap.get(comment.id)!;
        if (comment.parent_id) {
          const parent = commentMap.get(comment.parent_id);
          if (parent) {
            parent.replies.push(commentWithExtras);
          }
        } else {
          rootComments.push(commentWithExtras);
        }
      });
      
      return rootComments;
    },
  });
};

export const useCommentOperations = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { user } = useAuth();

  const createComment = useMutation({
    mutationFn: async ({ articleId, content, parentId }: { 
      articleId: string; 
      content: string; 
      parentId?: string;
    }) => {
      if (!user) throw new Error('User must be authenticated');

      const { data, error } = await supabase
        .from('comments')
        .insert([{
          article_id: articleId,
          user_id: user.id,
          content,
          parent_id: parentId || null
        }])
        .select()
        .single();
      
      if (error) throw error;
      
      // Fetch article details for notification
      const { data: article } = await supabase
        .from('articles')
        .select('title, slug')
        .eq('id', articleId)
        .single();
      
      // Fetch user profile for notification
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();
      
      // Send admin notification (don't await to avoid blocking)
      supabase.functions.invoke('notify-admin', {
        body: {
          type: 'comment',
          data: {
            name: profile?.full_name || 'Anonymous User',
            articleTitle: article?.title || 'Unknown Article',
            commentContent: content,
            articleId: article?.slug || articleId
          }
        }
      }).catch((notifyError) => {
        console.error('Failed to send admin notification:', notifyError);
      });
      
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['comments', variables.articleId] });
      toast({
        title: "Success",
        description: "Comment posted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to post comment",
        variant: "destructive",
      });
    },
  });

  const toggleCommentLike = useMutation({
    mutationFn: async ({ commentId }: { commentId: string }) => {
      if (!user) throw new Error('User must be authenticated');

      const { data: existing } = await supabase
        .from('comment_likes')
        .select('id')
        .eq('comment_id', commentId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from('comment_likes')
          .delete()
          .eq('id', existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('comment_likes')
          .insert([{
            comment_id: commentId,
            user_id: user.id
          }]);
        if (error) throw error;
      }
    },
    onSuccess: (_, variables) => {
      // Refresh comments to update like counts
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to like comment",
        variant: "destructive",
      });
    },
  });

  return { createComment, toggleCommentLike };
};

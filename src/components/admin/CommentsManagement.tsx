import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Trash2, ExternalLink, MessageSquare, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface CommentsManagementProps {
  setActiveTab: (tab: any) => void;
}

const CommentsManagement: React.FC<CommentsManagementProps> = ({ setActiveTab }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  // Fetch comments with user and article info
  const { data: commentsData = [], isLoading } = useQuery({
    queryKey: ['admin-comments', selectedArticle],
    queryFn: async () => {
      let query = supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false });

      if (selectedArticle) {
        query = query.eq('article_id', selectedArticle);
      }

      const { data, error } = await query;
      if (error) throw error;

      // Fetch user profiles
      const userIds = [...new Set(data.map(c => c.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .in('id', userIds);

      // Fetch articles
      const articleIds = [...new Set(data.map(c => c.article_id))];
      const { data: articles } = await supabase
        .from('articles')
        .select('id, title, slug')
        .in('id', articleIds);

      // Combine data
      return data.map(comment => ({
        ...comment,
        user: profiles?.find(p => p.id === comment.user_id),
        article: articles?.find(a => a.id === comment.article_id),
      }));
    },
  });

  const comments = commentsData;

  // Fetch articles for filter
  const { data: articles = [] } = useQuery({
    queryKey: ['articles-filter'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('id, title, slug')
        .eq('published', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  // Delete comment mutation
  const deleteComment = useMutation({
    mutationFn: async (commentId: string) => {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-comments'] });
      toast({
        title: 'Success',
        description: 'Comment deleted successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete comment',
        variant: 'destructive',
      });
    },
  });

  // Get comment stats
  const totalComments = comments.length;
  const topLevelComments = comments.filter(c => !c.parent_id).length;
  const replies = comments.filter(c => c.parent_id).length;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div className="mb-4">
        <Button 
          onClick={() => setActiveTab('dashboard')}
          variant="outline"
          className="border-purple-600/30 text-purple-300 hover:bg-purple-600/20"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-purple-400" />
            Comments Management
          </h2>
          <p className="text-gray-400 mt-1">
            {totalComments} total • {topLevelComments} comments • {replies} replies
          </p>
        </div>
      </div>

      {/* Filter by article */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={selectedArticle === null ? 'default' : 'outline'}
          onClick={() => setSelectedArticle(null)}
          size="sm"
        >
          All Articles
        </Button>
        {articles.slice(0, 5).map(article => (
          <Button
            key={article.id}
            variant={selectedArticle === article.id ? 'default' : 'outline'}
            onClick={() => setSelectedArticle(article.id)}
            size="sm"
          >
            {article.title}
          </Button>
        ))}
      </div>

      {/* Comments list */}
      <div className="space-y-4">
        {isLoading ? (
          <Card className="bg-slate-800/50 border-purple-800/30 p-6">
            <p className="text-gray-400 text-center">Loading comments...</p>
          </Card>
        ) : comments.length === 0 ? (
          <Card className="bg-slate-800/50 border-purple-800/30 p-6">
            <p className="text-gray-400 text-center">No comments found</p>
          </Card>
        ) : (
          comments.map(comment => (
            <Card
              key={comment.id}
              className="bg-slate-800/50 border-purple-800/30 hover:border-purple-600/50 transition-colors"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-white font-medium">
                        {comment.user?.full_name || 'Anonymous'}
                      </span>
                      {comment.parent_id && (
                        <Badge variant="outline" className="text-xs">
                          Reply
                        </Badge>
                      )}
                      <span className="text-gray-400 text-sm">
                        {format(new Date(comment.created_at), 'MMM d, yyyy HH:mm')}
                      </span>
                    </div>

                    <p className="text-gray-300 leading-relaxed">{comment.content}</p>

                    <div className="flex items-center gap-3 text-sm">
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="text-purple-400 hover:text-purple-300"
                      >
                        <a
                          href={`/articles/${comment.article?.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          {comment.article?.title}
                        </a>
                      </Button>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteComment.mutate(comment.id)}
                    className="border-red-600/30 text-red-400 hover:bg-red-600/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentsManagement;

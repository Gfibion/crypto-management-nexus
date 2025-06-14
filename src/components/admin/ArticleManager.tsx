
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ArticleForm from './ArticleForm';

const ArticleManager: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch all articles (including unpublished ones for admin)
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ['admin-articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  // Delete article mutation
  const deleteArticle = useMutation({
    mutationFn: async (articleId: string) => {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', articleId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-articles'] });
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      toast({
        title: "Success",
        description: "Article deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete article",
        variant: "destructive",
      });
    },
  });

  // Toggle published status
  const togglePublished = useMutation({
    mutationFn: async ({ id, published }: { id: string; published: boolean }) => {
      const { error } = await supabase
        .from('articles')
        .update({ published: !published })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-articles'] });
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      toast({
        title: "Success",
        description: "Article status updated successfully",
      });
    },
  });

  const handleEdit = (article: any) => {
    setEditingArticle(article);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingArticle(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-white">Loading articles...</div>
      </div>
    );
  }

  if (showForm) {
    return (
      <ArticleForm
        article={editingArticle}
        onClose={handleCloseForm}
        onSuccess={() => {
          handleCloseForm();
          queryClient.invalidateQueries({ queryKey: ['admin-articles'] });
          queryClient.invalidateQueries({ queryKey: ['articles'] });
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Article Management</h2>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Article
        </Button>
      </div>

      <div className="grid gap-6">
        {articles.map((article) => (
          <Card key={article.id} className="bg-slate-800/50 border-purple-800/30">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg text-white mb-2">
                    {article.title}
                  </CardTitle>
                  <p className="text-gray-300 text-sm mb-3">{article.excerpt}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge 
                      variant={article.published ? "default" : "secondary"}
                      className={article.published ? "bg-green-600" : "bg-gray-600"}
                    >
                      {article.published ? "Published" : "Draft"}
                    </Badge>
                    
                    {article.featured && (
                      <Badge variant="outline" className="border-yellow-400 text-yellow-400">
                        Featured
                      </Badge>
                    )}
                    
                    {article.category && (
                      <Badge variant="outline" className="border-purple-400 text-purple-300">
                        {article.category}
                      </Badge>
                    )}
                  </div>

                  <div className="text-sm text-gray-400">
                    Created: {new Date(article.created_at).toLocaleDateString()} • 
                    Read time: {article.read_time || 'N/A'} min
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => togglePublished.mutate({ id: article.id, published: article.published })}
                    disabled={togglePublished.isPending}
                    className="border-blue-600/30 text-blue-300 hover:bg-blue-600/20"
                  >
                    {article.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(article)}
                    className="border-green-600/30 text-green-300 hover:bg-green-600/20"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteArticle.mutate(article.id)}
                    disabled={deleteArticle.isPending}
                    className="border-red-600/30 text-red-300 hover:bg-red-600/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}

        {articles.length === 0 && (
          <Card className="bg-slate-800/50 border-purple-800/30 p-12 text-center">
            <h3 className="text-xl font-semibold text-white mb-4">No Articles Found</h3>
            <p className="text-gray-300 mb-6">Get started by creating your first article.</p>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Article
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ArticleManager;


import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useArticles = (includeUnpublished = false) => {
  return useQuery({
    queryKey: ['articles', includeUnpublished],
    queryFn: async () => {
      let query = supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (!includeUnpublished) {
        query = query.eq('published', true);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    },
  });
};

export const useArticleOperations = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createArticle = useMutation({
    mutationFn: async (articleData: any) => {
      const { data, error } = await supabase
        .from('articles')
        .insert([articleData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      toast({
        title: "Success",
        description: "Article created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create article",
        variant: "destructive",
      });
    },
  });

  const updateArticle = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { error } = await supabase
        .from('articles')
        .update(data)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      toast({
        title: "Success",
        description: "Article updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update article",
        variant: "destructive",
      });
    },
  });

  const deleteArticle = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
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

  return {
    createArticle,
    updateArticle,
    deleteArticle,
  };
};

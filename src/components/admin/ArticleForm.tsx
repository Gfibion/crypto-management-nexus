
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface ArticleFormProps {
  article?: any;
  onClose: () => void;
  onSuccess: () => void;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ article, onClose, onSuccess }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    featured: false,
    published: false,
    read_time: '',
  });

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title || '',
        excerpt: article.excerpt || '',
        content: article.content || '',
        category: article.category || '',
        tags: article.tags ? article.tags.join(', ') : '',
        featured: article.featured || false,
        published: article.published || false,
        read_time: article.read_time?.toString() || '',
      });
    }
  }, [article]);

  const saveArticle = useMutation({
    mutationFn: async (data: any) => {
      const slug = data.title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s-]/g, '')
        .replace(/\s+/g, '-');

      const articleData = {
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category || null,
        tags: data.tags ? data.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean) : null,
        featured: data.featured,
        published: data.published,
        read_time: data.read_time ? parseInt(data.read_time) : null,
        slug,
        author_id: user?.id,
      };

      if (article) {
        // Update existing article
        const { error } = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', article.id);
        
        if (error) throw error;
      } else {
        // Create new article
        const { error } = await supabase
          .from('articles')
          .insert([articleData]);
        
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: article ? "Article updated successfully" : "Article created successfully",
      });
      onSuccess();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save article",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "Validation Error",
        description: "Title and content are required",
        variant: "destructive",
      });
      return;
    }

    saveArticle.mutate(formData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={onClose}
          className="border-purple-600/30 text-purple-300"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Articles
        </Button>
        <h2 className="text-2xl font-bold text-white">
          {article ? 'Edit Article' : 'Create New Article'}
        </h2>
      </div>

      <Card className="bg-slate-800/50 border-purple-800/30">
        <CardHeader>
          <CardTitle className="text-white">Article Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-white">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="bg-slate-700 border-purple-600/30 text-white"
                    placeholder="Enter article title"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category" className="text-white">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="bg-slate-700 border-purple-600/30 text-white"
                    placeholder="e.g., Technology, Business"
                  />
                </div>

                <div>
                  <Label htmlFor="tags" className="text-white">Tags</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    className="bg-slate-700 border-purple-600/30 text-white"
                    placeholder="Separate tags with commas"
                  />
                </div>

                <div>
                  <Label htmlFor="read_time" className="text-white">Read Time (minutes)</Label>
                  <Input
                    id="read_time"
                    type="number"
                    value={formData.read_time}
                    onChange={(e) => handleInputChange('read_time', e.target.value)}
                    className="bg-slate-700 border-purple-600/30 text-white"
                    placeholder="Estimated read time"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="excerpt" className="text-white">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    className="bg-slate-700 border-purple-600/30 text-white h-32"
                    placeholder="Brief description of the article"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => handleInputChange('featured', checked)}
                    />
                    <Label htmlFor="featured" className="text-white">Featured Article</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="published"
                      checked={formData.published}
                      onCheckedChange={(checked) => handleInputChange('published', checked)}
                    />
                    <Label htmlFor="published" className="text-white">Publish Article</Label>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="content" className="text-white">Content *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                className="bg-slate-700 border-purple-600/30 text-white min-h-96"
                placeholder="Write your article content here (supports Markdown)"
                required
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={saveArticle.isPending}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Save className="h-4 w-4 mr-2" />
                {saveArticle.isPending ? 'Saving...' : (article ? 'Update Article' : 'Create Article')}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-gray-600/30 text-gray-300"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticleForm;

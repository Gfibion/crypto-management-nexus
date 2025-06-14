
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { FileText, Eye, Star, Clock } from 'lucide-react';

const ArticleStats: React.FC = () => {
  const { data: stats } = useQuery({
    queryKey: ['article-stats'],
    queryFn: async () => {
      const { data: articles, error } = await supabase
        .from('articles')
        .select('published, featured, read_time');
      
      if (error) throw error;

      const total = articles.length;
      const published = articles.filter(a => a.published).length;
      const featured = articles.filter(a => a.featured).length;
      const drafts = total - published;
      const avgReadTime = articles.reduce((acc, a) => acc + (a.read_time || 0), 0) / total;

      return {
        total,
        published,
        drafts,
        featured,
        avgReadTime: Math.round(avgReadTime),
      };
    },
  });

  if (!stats) return null;

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      <Card className="bg-slate-800/50 border-purple-800/30">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-300">Total Articles</CardTitle>
          <FileText className="h-4 w-4 text-purple-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{stats.total}</div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-purple-800/30">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-300">Published</CardTitle>
          <Eye className="h-4 w-4 text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{stats.published}</div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-purple-800/30">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-300">Featured</CardTitle>
          <Star className="h-4 w-4 text-yellow-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{stats.featured}</div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-purple-800/30">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-300">Avg. Read Time</CardTitle>
          <Clock className="h-4 w-4 text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{stats.avgReadTime}m</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticleStats;

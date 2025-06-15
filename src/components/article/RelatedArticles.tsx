
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  created_at: string;
  read_time?: number;
}

interface RelatedArticlesProps {
  articles: Article[];
  currentArticleId: string;
  onNavigate: (slug: string) => void;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({
  articles,
  currentArticleId,
  onNavigate
}) => {
  const relatedArticles = articles
    .filter(article => article.id !== currentArticleId)
    .slice(0, 4);

  if (relatedArticles.length === 0) return null;

  return (
    <Card className="bg-slate-800/50 border-purple-800/30">
      <CardHeader>
        <CardTitle className="text-xl text-white">More Articles</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {relatedArticles.map((article) => (
            <div
              key={article.id}
              className="p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors cursor-pointer"
              onClick={() => onNavigate(article.slug)}
            >
              <h4 className="text-white font-medium line-clamp-2 mb-2">{article.title}</h4>
              {article.excerpt && (
                <p className="text-gray-400 text-sm line-clamp-2">{article.excerpt}</p>
              )}
              <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                <span>{new Date(article.created_at).toLocaleDateString()}</span>
                {article.read_time && <span>{article.read_time} min read</span>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RelatedArticles;

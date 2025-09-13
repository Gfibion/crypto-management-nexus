
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Tag } from 'lucide-react';

interface ArticleHeaderProps {
  article: {
    title: string;
    featured?: boolean;
    created_at: string;
    read_time?: number;
    category?: string;
    excerpt?: string;
    featured_image?: string;
  };
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({ article }) => {
  return (
    <>
      {article.featured_image && (
        <div className="relative w-full h-64 sm:h-80 md:h-96 mb-8 rounded-lg overflow-hidden">
          <img 
            src={article.featured_image} 
            alt={article.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.parentElement!.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
          {article.featured && (
            <div className="absolute top-4 right-4">
              <Badge variant="outline" className="border-yellow-400 text-yellow-400 bg-slate-900/70">
                Featured
              </Badge>
            </div>
          )}
        </div>
      )}

      {!article.featured_image && (
        <div className="flex items-center justify-between mb-4">
          {article.featured && (
            <Badge variant="outline" className="border-yellow-400 text-yellow-400">
              Featured
            </Badge>
          )}
        </div>
      )}
      
      <h1 className="text-3xl md:text-4xl text-white mb-4">
        {article.title}
      </h1>
      
      <div className="flex items-center gap-6 text-gray-400 mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>{new Date(article.created_at).toLocaleDateString()}</span>
        </div>
        {article.read_time && (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{article.read_time} min read</span>
          </div>
        )}
      </div>

      {article.category && (
        <div className="flex items-center gap-2 mb-4">
          <Tag className="h-4 w-4 text-purple-400" />
          <Badge variant="outline" className="border-purple-400/30 text-purple-300">
            {article.category}
          </Badge>
        </div>
      )}

      {article.excerpt && (
        <p className="text-xl text-gray-300 leading-relaxed">
          {article.excerpt}
        </p>
      )}
    </>
  );
};

export default ArticleHeader;

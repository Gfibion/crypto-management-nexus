
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Article {
  slug: string;
  title: string;
  excerpt?: string;
}

interface ArticleNavigationProps {
  previousArticle?: Article;
  nextArticle?: Article;
  onNavigate: (slug: string) => void;
}

const ArticleNavigation: React.FC<ArticleNavigationProps> = ({
  previousArticle,
  nextArticle,
  onNavigate
}) => {
  return (
    <div className="grid md:grid-cols-2 gap-6 my-8">
      {previousArticle && (
        <Card className="bg-slate-800/50 border-purple-800/30 hover:border-purple-600/50 transition-all duration-300 cursor-pointer">
          <CardContent 
            className="p-6"
            onClick={() => onNavigate(previousArticle.slug)}
          >
            <div className="flex items-center gap-3 mb-2">
              <ChevronLeft className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-purple-400 uppercase tracking-wide">Previous Article</span>
            </div>
            <h3 className="text-white font-semibold line-clamp-2">{previousArticle.title}</h3>
            {previousArticle.excerpt && (
              <p className="text-gray-400 text-sm mt-2 line-clamp-2">{previousArticle.excerpt}</p>
            )}
          </CardContent>
        </Card>
      )}

      {nextArticle && (
        <Card className="bg-slate-800/50 border-purple-800/30 hover:border-purple-600/50 transition-all duration-300 cursor-pointer">
          <CardContent 
            className="p-6"
            onClick={() => onNavigate(nextArticle.slug)}
          >
            <div className="flex items-center justify-end gap-3 mb-2">
              <span className="text-sm text-purple-400 uppercase tracking-wide">Next Article</span>
              <ChevronRight className="h-4 w-4 text-purple-400" />
            </div>
            <h3 className="text-white font-semibold line-clamp-2 text-right">{nextArticle.title}</h3>
            {nextArticle.excerpt && (
              <p className="text-gray-400 text-sm mt-2 line-clamp-2 text-right">{nextArticle.excerpt}</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ArticleNavigation;

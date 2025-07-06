
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ArticleContentProps {
  content: string;
  tags?: string[];
}

const ArticleContent: React.FC<ArticleContentProps> = ({ content, tags }) => {
  return (
    <>
      <div className="prose prose-invert max-w-none animate-fade-in">
        <div className="text-gray-300 leading-relaxed whitespace-pre-wrap text-lg">
          {content}
        </div>
      </div>

      {tags && tags.length > 0 && (
        <div className="mt-8 pt-8 border-t border-gray-700 animate-slide-in">
          <h3 className="text-lg font-semibold text-white mb-4 animate-fade-in">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag: string, index: number) => (
              <Badge 
                key={index} 
                variant="secondary"
                className={`animate-scale-in stagger-${Math.min(index + 1, 5)} hover:scale-110 transition-transform duration-300`}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ArticleContent;

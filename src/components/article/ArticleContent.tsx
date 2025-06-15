
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ArticleContentProps {
  content: string;
  tags?: string[];
}

const ArticleContent: React.FC<ArticleContentProps> = ({ content, tags }) => {
  return (
    <>
      <div className="prose prose-invert max-w-none">
        <div className="text-gray-300 leading-relaxed whitespace-pre-wrap text-lg">
          {content}
        </div>
      </div>

      {tags && tags.length > 0 && (
        <div className="mt-8 pt-8 border-t border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag: string, index: number) => (
              <Badge key={index} className="bg-green-800 text-green-100 hover:bg-green-700 text-sm">
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


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, Clock, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ArticleCardProps {
  article: any;
  onRead?: (title: string) => void;
  showFullContent?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onRead, showFullContent = false }) => {
  const navigate = useNavigate();

  const handleReadClick = () => {
    if (article.slug) {
      navigate(`/articles/${article.slug}`);
    } else if (onRead) {
      onRead(article.title);
    }
  };

  return (
    <Card className="bg-slate-800/50 border-purple-800/30 hover:border-purple-600/50 transition-all duration-300 hover:transform hover:scale-105">
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <CardTitle className="text-lg text-white line-clamp-2">
            {article.title}
          </CardTitle>
          {article.featured && (
            <Badge variant="outline" className="border-yellow-400 text-yellow-400 flex-shrink-0">
              Featured
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(article.created_at).toLocaleDateString()}</span>
          </div>
          {article.read_time && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{article.read_time} min read</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        {article.excerpt && (
          <p className="text-gray-300 mb-4 line-clamp-3">{article.excerpt}</p>
        )}
        
        {showFullContent && article.content && (
          <div className="text-gray-300 mb-4 prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap">{article.content}</div>
          </div>
        )}
        
        {article.category && (
          <div className="flex items-center gap-2 mb-4">
            <Tag className="h-4 w-4 text-purple-400" />
            <Badge variant="outline" className="border-purple-400/30 text-purple-300">
              {article.category}
            </Badge>
          </div>
        )}
        
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.slice(0, 3).map((tag: string, index: number) => (
              <Badge key={index} className="bg-green-800 text-green-100 hover:bg-green-700 text-xs">
                {tag}
              </Badge>
            ))}
            {article.tags.length > 3 && (
              <Badge className="bg-green-800 text-green-100 hover:bg-green-700 text-xs">
                +{article.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
        
        {!showFullContent && (
          <Button 
            onClick={handleReadClick}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Read Article
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ArticleCard;

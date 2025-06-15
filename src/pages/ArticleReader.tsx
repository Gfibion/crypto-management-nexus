
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useArticles } from '@/hooks/useArticles';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import ArticleLikes from '@/components/ArticleLikes';
import CommentsSection from '@/components/CommentsSection';

const ArticleReader: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: articles, isLoading } = useArticles();

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
        <div className="text-white text-xl">Loading article...</div>
      </div>
    );
  }

  const currentArticle = articles?.find(article => article.slug === slug);
  
  if (!currentArticle) {
    return (
      <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Article not found</h1>
          <Button 
            onClick={() => navigate('/articles')}
            className="bg-gradient-to-r from-purple-600 to-blue-600"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Articles
          </Button>
        </div>
      </div>
    );
  }

  const currentIndex = articles?.findIndex(article => article.id === currentArticle.id) || 0;
  const previousArticle = articles && currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = articles && currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Button 
            onClick={() => navigate('/articles')}
            variant="outline"
            className="border-purple-600/30 text-purple-300 hover:bg-purple-600/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Articles
          </Button>
        </div>

        {/* Article Content */}
        <Card className="bg-slate-800/50 border-purple-800/30 mb-8">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              {currentArticle.featured && (
                <Badge variant="outline" className="border-yellow-400 text-yellow-400">
                  Featured
                </Badge>
              )}
            </div>
            
            <CardTitle className="text-3xl md:text-4xl text-white mb-4">
              {currentArticle.title}
            </CardTitle>
            
            <div className="flex items-center gap-6 text-gray-400 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(currentArticle.created_at).toLocaleDateString()}</span>
              </div>
              {currentArticle.read_time && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{currentArticle.read_time} min read</span>
                </div>
              )}
            </div>

            {currentArticle.category && (
              <div className="flex items-center gap-2 mb-4">
                <Tag className="h-4 w-4 text-purple-400" />
                <Badge variant="outline" className="border-purple-400/30 text-purple-300">
                  {currentArticle.category}
                </Badge>
              </div>
            )}

            {currentArticle.excerpt && (
              <p className="text-xl text-gray-300 leading-relaxed">
                {currentArticle.excerpt}
              </p>
            )}
          </CardHeader>
          
          <CardContent>
            <div className="prose prose-invert max-w-none">
              <div className="text-gray-300 leading-relaxed whitespace-pre-wrap text-lg">
                {currentArticle.content}
              </div>
            </div>

            {currentArticle.tags && currentArticle.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {currentArticle.tags.map((tag: string, index: number) => (
                    <Badge key={index} className="bg-green-800 text-green-100 hover:bg-green-700 text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Article Likes */}
            <ArticleLikes articleId={currentArticle.id} />
          </CardContent>
        </Card>

        {/* Comments Section */}
        <CommentsSection articleId={currentArticle.id} />

        {/* Article Navigation */}
        <div className="grid md:grid-cols-2 gap-6 my-8">
          {previousArticle && (
            <Card className="bg-slate-800/50 border-purple-800/30 hover:border-purple-600/50 transition-all duration-300 cursor-pointer">
              <CardContent 
                className="p-6"
                onClick={() => navigate(`/articles/${previousArticle.slug}`)}
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
                onClick={() => navigate(`/articles/${nextArticle.slug}`)}
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

        {/* Related Articles */}
        {articles && articles.length > 1 && (
          <Card className="bg-slate-800/50 border-purple-800/30">
            <CardHeader>
              <CardTitle className="text-xl text-white">More Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {articles
                  .filter(article => article.id !== currentArticle.id)
                  .slice(0, 4)
                  .map((article) => (
                    <div
                      key={article.id}
                      className="p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors cursor-pointer"
                      onClick={() => navigate(`/articles/${article.slug}`)}
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
        )}
      </div>
    </div>
  );
};

export default ArticleReader;

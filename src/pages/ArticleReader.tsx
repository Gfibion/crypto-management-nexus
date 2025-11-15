import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useArticles } from '@/hooks/useArticles';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ArticleLikes from '@/components/ArticleLikes';
import CommentsSection from '@/components/CommentsSection';
import ArticleHeader from '@/components/article/ArticleHeader';
import ArticleContent from '@/components/article/ArticleContent';
import ArticleNavigation from '@/components/article/ArticleNavigation';
import RelatedArticles from '@/components/article/RelatedArticles';
import BackButton from '@/components/article/BackButton';
import CommentsToggle from '@/components/article/CommentsToggle';
import { useArticleLikesNotifications } from '@/hooks/useArticleLikes';
import SEOHead from '@/components/SEOHead';

const ArticleReader: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: articles, isLoading } = useArticles();
  const [showComments, setShowComments] = useState(false);

  // Find current article
  const currentArticle = articles?.find(article => article.slug === slug);
  
  // Enable article likes notifications for this article
  useArticleLikesNotifications(currentArticle?.id);

  // Scroll to top when article changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
        <div className="text-white text-xl">Loading article...</div>
      </div>
    );
  }

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

  const handleArticleNavigation = (articleSlug: string) => {
    setShowComments(false); // Close comments when navigating
    navigate(`/articles/${articleSlug}`);
  };

  return (
    <>
      <SEOHead 
        title={`${currentArticle.title} - Gfibion Joseph Mutua`}
        description={currentArticle.excerpt || `Read ${currentArticle.title} by Gfibion Joseph Mutua. Expert insights on business management and ICT consulting.`}
        keywords={`${currentArticle.tags?.join(', ')}, ${currentArticle.category}, business article, ICT article, Joseph Mutua`}
        ogImage={currentArticle.featured_image || undefined}
        ogType="article"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": currentArticle.title,
          "description": currentArticle.excerpt,
          "image": currentArticle.featured_image,
          "datePublished": currentArticle.created_at,
          "dateModified": currentArticle.updated_at,
          "author": {
            "@type": "Person",
            "name": "Gfibion Joseph Mutua",
            "jobTitle": "Business Manager & ICT Consultant"
          },
          "publisher": {
            "@type": "Person",
            "name": "Gfibion Joseph Mutua"
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://gfibion-jmutua.vercel.app/articles/${currentArticle.slug}`
          },
          "keywords": currentArticle.tags?.join(', '),
          "articleSection": currentArticle.category,
          "wordCount": currentArticle.content.split(' ').length
        }}
      />
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          <BackButton onBack={() => navigate('/articles')} />

        {/* Article Content */}
        <Card className="bg-slate-800/50 border-purple-800/30 mb-8">
          <CardHeader>
            <ArticleHeader article={currentArticle} />
          </CardHeader>
          
          <CardContent>
            <ArticleContent 
              content={currentArticle.content}
              tags={currentArticle.tags}
            />

            <ArticleLikes articleId={currentArticle.id} />

            <CommentsToggle 
              showComments={showComments}
              onToggle={() => setShowComments(!showComments)}
            />
          </CardContent>
        </Card>

        {/* Comments Section */}
        {showComments && (
          <CommentsSection 
            articleId={currentArticle.id} 
            onClose={() => setShowComments(false)}
          />
        )}

        <ArticleNavigation
          previousArticle={previousArticle}
          nextArticle={nextArticle}
          onNavigate={handleArticleNavigation}
        />

        {articles && articles.length > 1 && (
          <RelatedArticles
            articles={articles}
            currentArticleId={currentArticle.id}
            onNavigate={handleArticleNavigation}
          />
        )}
        </div>
      </div>
    </>
  );
};

export default ArticleReader;


import { useArticles } from "@/hooks/useArticles";
import { useGuestMode } from "@/hooks/useGuestMode";
import GuestModePrompt from "@/components/GuestModePrompt";
import ArticleCard from "@/components/ArticleCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { BookOpen, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "@/components/PageLayout";

const Articles = () => {
  const { data: articles, isLoading, error } = useArticles();
  const { showPrompt, pendingAction, requireAuth, closePrompt, isAuthenticated } = useGuestMode();

  const handleReadArticle = (title: string) => {
    requireAuth(`read the full article "${title}"`);
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <LoadingSpinner message="Loading articles..." size="lg" />
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-red-400 text-xl animate-fade-in">Error loading articles</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="section-title text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
            Articles & Insights
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-slide-in stagger-1">
            Expert insights on business management and technology trends
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto mt-6 animate-pulse"></div>
          
          {!isAuthenticated && (
            <div className="mt-6 p-4 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-400/30 rounded-lg max-w-md mx-auto backdrop-blur-sm animate-scale-in stagger-2">
              <p className="text-yellow-400 text-sm flex items-center justify-center gap-2">
                <Lock className="h-4 w-4 animate-pulse" />
                Register to read full articles and get exclusive content
              </p>
            </div>
          )}
        </div>

        {/* Articles Grid */}
        {articles && articles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {articles.map((article, index) => (
              <div key={article.id} className={`animate-scale-in stagger-${Math.min(index + 1, 5)}`}>
                <ArticleCard
                  article={article}
                  onRead={handleReadArticle}
                />
              </div>
            ))}
          </div>
        ) : (
          <Card className="bg-slate-800/50 border-purple-800/30 text-center p-12 backdrop-blur-sm shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 animate-scale-in">
            <BookOpen className="h-16 w-16 text-purple-400 mx-auto mb-4 animate-float" />
            <h3 className="text-2xl font-bold text-white mb-4 animate-slide-in">Coming Soon</h3>
            <p className="text-gray-300 mb-6 animate-fade-in stagger-1">
              I'm currently working on exciting articles about business strategy and technology trends.
            </p>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 animate-bounce-gentle">
              <User className="h-4 w-4 mr-2" />
              Get Notified When Published
            </Button>
          </Card>
        )}

        {/* Newsletter Signup */}
        <Card className="bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-cyan-900/30 border-purple-600/30 backdrop-blur-sm shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 animate-gradient animate-scale-in">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4 animate-slide-in">Stay Updated</h2>
            <p className="text-xl text-gray-300 mb-8 animate-fade-in stagger-1">
              Get the latest insights delivered directly to your inbox
            </p>
            <Button 
              onClick={() => requireAuth("subscribe to newsletter")}
              size="lg"
              className="px-8 py-3 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 animate-pulse"
            >
              {isAuthenticated ? 'Subscribe to Newsletter' : 'Sign Up for Newsletter'}
            </Button>
          </CardContent>
        </Card>

        <GuestModePrompt 
          isOpen={showPrompt}
          onClose={closePrompt}
          actionName={pendingAction}
        />
      </div>
    </PageLayout>
  );
};

export default Articles;

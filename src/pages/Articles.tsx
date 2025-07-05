import { useArticles } from "@/hooks/useArticles";
import { useGuestMode } from "@/hooks/useGuestMode";
import GuestModePrompt from "@/components/GuestModePrompt";
import ArticleCard from "@/components/ArticleCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { BookOpen, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Articles = () => {
  const { data: articles, isLoading, error } = useArticles();
  const { showPrompt, pendingAction, requireAuth, closePrompt, isAuthenticated } = useGuestMode();

  const handleReadArticle = (title: string) => {
    requireAuth(`read the full article "${title}"`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
        <LoadingSpinner message="Loading articles..." size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
        <div className="text-red-400 text-xl">Error loading articles</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Articles & Insights
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Expert insights on business management and technology trends
          </p>
          {!isAuthenticated && (
            <div className="mt-4 p-3 bg-yellow-400/10 border border-yellow-400/30 rounded-lg max-w-md mx-auto">
              <p className="text-yellow-400 text-sm flex items-center justify-center gap-2">
                <Lock className="h-4 w-4" />
                Register to read full articles and get exclusive content
              </p>
            </div>
          )}
        </div>

        {/* Articles Grid */}
        {articles && articles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onRead={handleReadArticle}
              />
            ))}
          </div>
        ) : (
          <Card className="bg-slate-800/50 border-purple-800/30 text-center p-12">
            <BookOpen className="h-16 w-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Coming Soon</h3>
            <p className="text-gray-300 mb-6">
              I'm currently working on exciting articles about business strategy and technology trends.
            </p>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0">
              <User className="h-4 w-4 mr-2" />
              Get Notified When Published
            </Button>
          </Card>
        )}

        {/* Newsletter Signup */}
        <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-600/30">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-xl text-gray-300 mb-8">
              Get the latest insights delivered directly to your inbox
            </p>
            <Button 
              onClick={() => requireAuth("subscribe to newsletter")}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all duration-300"
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
    </div>
  );
};

export default Articles;

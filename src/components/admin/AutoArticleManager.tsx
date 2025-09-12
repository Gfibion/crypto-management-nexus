import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Newspaper, Clock, Trash2, RefreshCw, Calendar } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';

const AutoArticleManager: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCleaningUp, setIsCleaningUp] = useState(false);
  const { toast } = useToast();

  const handleGenerateArticles = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('auto-generate-articles', {
        body: {}
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: `Generated ${data.articlesCreated} new articles successfully`,
        duration: 5000,
      });
    } catch (error) {
      console.error('Error generating articles:', error);
      toast({
        title: "Error",
        description: "Failed to generate articles. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCleanupOldArticles = async () => {
    setIsCleaningUp(true);
    try {
      const twoMonthsAgo = new Date();
      twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

      const { data, error } = await supabase
        .from('articles')
        .delete()
        .lt('created_at', twoMonthsAgo.toISOString());

      if (error) throw error;

      toast({
        title: "Cleanup Complete",
        description: `Removed articles older than 2 months`,
        duration: 3000,
      });
    } catch (error) {
      console.error('Error cleaning up articles:', error);
      toast({
        title: "Error",
        description: "Failed to cleanup old articles",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsCleaningUp(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-purple-600/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Newspaper className="h-5 w-5 text-purple-400" />
            Automated Article Generation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-blue-600/20 bg-blue-950/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-sm font-medium text-blue-300">TechCrunch</span>
                </div>
                <p className="text-xs text-gray-400">Technology News</p>
                <Badge variant="outline" className="mt-2 border-blue-400/30 text-blue-300">
                  Technology
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-green-600/20 bg-green-950/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm font-medium text-green-300">Google Finance</span>
                </div>
                <p className="text-xs text-gray-400">Financial News</p>
                <Badge variant="outline" className="mt-2 border-green-400/30 text-green-300">
                  Finance
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-yellow-600/20 bg-yellow-950/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-sm font-medium text-yellow-300">Yahoo Finance</span>
                </div>
                <p className="text-xs text-gray-400">Business News</p>
                <Badge variant="outline" className="mt-2 border-yellow-400/30 text-yellow-300">
                  Business
                </Badge>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={handleGenerateArticles} 
              disabled={isGenerating}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              {isGenerating ? (
                <>
                  <LoadingSpinner />
                  <span className="ml-2">Generating Articles...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Generate 3 Articles Now
                </>
              )}
            </Button>

            <Button 
              onClick={handleCleanupOldArticles} 
              disabled={isCleaningUp}
              variant="outline"
              className="border-red-600/30 text-red-300 hover:bg-red-950/20"
            >
              {isCleaningUp ? (
                <>
                  <LoadingSpinner />
                  <span className="ml-2">Cleaning...</span>
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Cleanup Old Articles
                </>
              )}
            </Button>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium text-white">Automation Schedule</span>
            </div>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3" />
                <span>Articles: Every 3 days at 6:00 AM UTC</span>
              </div>
              <div className="flex items-center gap-2">
                <Trash2 className="h-3 w-3" />
                <span>Cleanup: Daily at 2:00 AM UTC (removes 2+ month old articles)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutoArticleManager;
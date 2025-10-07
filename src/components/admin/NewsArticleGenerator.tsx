import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Sparkles, Newspaper } from 'lucide-react';

const NewsArticleGenerator: React.FC = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [articleCount, setArticleCount] = useState('3');
  const [category, setCategory] = useState('technology');

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    try {
      toast({
        title: "Generating Articles",
        description: `Fetching news and generating ${articleCount} articles...`,
      });

      const { data, error } = await supabase.functions.invoke('generate-articles-from-news', {
        body: {
          count: parseInt(articleCount),
          category: category
        }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw new Error(error.message || 'Failed to invoke edge function');
      }

      if (data?.success) {
        toast({
          title: "Articles Generated Successfully",
          description: `Created ${data.generated} new articles from latest news!`,
        });
        
        // Refresh the page to show new articles
        window.location.reload();
      } else {
        const errorMsg = data?.error || 'Failed to generate articles';
        console.error('Generation failed:', errorMsg);
        throw new Error(errorMsg);
      }

    } catch (error: any) {
      console.error('Article generation error:', error);
      
      let errorMessage = "Failed to generate articles. ";
      
      if (error.message?.includes('NEWS_API_KEY')) {
        errorMessage += "Please check your NewsAPI key in Lovable Cloud secrets.";
      } else if (error.message?.includes('OPENAI_API_KEY')) {
        errorMessage += "Please check your OpenAI API key in Lovable Cloud secrets.";
      } else if (error.message?.includes('Rate limit')) {
        errorMessage += "Rate limit exceeded. Please try again later.";
      } else {
        errorMessage += error.message || "Unknown error occurred.";
      }
      
      toast({
        title: "Generation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-purple-800/30">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Newspaper className="h-6 w-6 text-purple-400" />
            <CardTitle className="text-white">AI Article Generator</CardTitle>
          </div>
          <CardDescription className="text-gray-400">
            Generate articles from latest news using NewsAPI and OpenAI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="count" className="text-white">Number of Articles</Label>
              <Input
                id="count"
                type="number"
                min="1"
                max="10"
                value={articleCount}
                onChange={(e) => setArticleCount(e.target.value)}
                className="bg-slate-700/50 border-purple-600/30 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-white">News Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-slate-700/50 border-purple-600/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Articles...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Articles
              </>
            )}
          </Button>

          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 space-y-2">
            <p className="text-sm text-blue-300 font-semibold">📋 How it works:</p>
            <ol className="text-sm text-gray-300 space-y-1 list-decimal list-inside">
              <li>Fetches latest news from NewsAPI</li>
              <li>OpenAI analyzes and enhances each article</li>
              <li>Generates comprehensive, SEO-friendly content</li>
              <li>Automatically publishes to your blog</li>
            </ol>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
            <p className="text-sm text-yellow-300">
              <strong>Note:</strong> Make sure both NEWS_API_KEY and OPENAI_API_KEY are configured in your Lovable Cloud secrets.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsArticleGenerator;

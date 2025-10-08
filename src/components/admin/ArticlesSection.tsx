
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ArticleManager from './ArticleManager';
import ArticleStats from './ArticleStats';
import NewsArticleGenerator from './NewsArticleGenerator';
import { Sparkles, List } from 'lucide-react';

interface ArticlesSectionProps {
  setActiveTab: (tab: 'dashboard' | 'articles') => void;
}

const ArticlesSection: React.FC<ArticlesSectionProps> = ({ setActiveTab }) => {
  const [activeSubTab, setActiveSubTab] = useState<'generate' | 'manage'>('generate');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => setActiveTab('dashboard')}
            className="border-purple-600/30 text-purple-300"
          >
            ← Back to Dashboard
          </Button>
          <h2 className="text-2xl font-bold text-white">Articles Management</h2>
        </div>
      </div>

      <ArticleStats />

      <Tabs value={activeSubTab} onValueChange={(v) => setActiveSubTab(v as 'generate' | 'manage')} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 bg-slate-800/50">
          <TabsTrigger 
            value="generate" 
            className="data-[state=active]:bg-purple-600"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            AI Generation
          </TabsTrigger>
          <TabsTrigger 
            value="manage"
            className="data-[state=active]:bg-purple-600"
          >
            <List className="h-4 w-4 mr-2" />
            Manage Articles
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="mt-6">
          <NewsArticleGenerator onSuccess={() => setActiveSubTab('manage')} />
        </TabsContent>

        <TabsContent value="manage" className="mt-6">
          <ArticleManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ArticlesSection;

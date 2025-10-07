
import React from 'react';
import { Button } from '@/components/ui/button';
import ArticleManager from './ArticleManager';
import ArticleStats from './ArticleStats';
import NewsArticleGenerator from './NewsArticleGenerator';

interface ArticlesSectionProps {
  setActiveTab: (tab: 'dashboard' | 'articles') => void;
}

const ArticlesSection: React.FC<ArticlesSectionProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          onClick={() => setActiveTab('dashboard')}
          className="border-purple-600/30 text-purple-300"
        >
          ← Back to Dashboard
        </Button>
        <h2 className="text-2xl font-bold text-white">Articles</h2>
      </div>
      <ArticleStats />
      <NewsArticleGenerator />
      <ArticleManager />
    </div>
  );
};

export default ArticlesSection;

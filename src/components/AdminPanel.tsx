
import React, { useState } from 'react';
import { useConversations } from '@/hooks/useChat';
import DashboardContent from './admin/DashboardContent';
import ArticlesSection from './admin/ArticlesSection';
import MessagesSection from './admin/MessagesSection';
import ContentSection from './admin/ContentSection';

type TabType = 'dashboard' | 'articles' | 'messages' | 'content';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const { data: conversations = [] } = useConversations();

  if (activeTab === 'articles') {
    return <ArticlesSection setActiveTab={setActiveTab} />;
  }

  if (activeTab === 'messages') {
    return <MessagesSection setActiveTab={setActiveTab} />;
  }

  if (activeTab === 'content') {
    return <ContentSection setActiveTab={setActiveTab} />;
  }

  return (
    <DashboardContent
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      conversations={conversations}
    />
  );
};

export default AdminPanel;

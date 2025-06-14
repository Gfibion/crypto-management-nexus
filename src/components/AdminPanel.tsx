
import React, { useState } from 'react';
import { useConversations } from '@/hooks/useChat';
import DashboardContent from './admin/DashboardContent';
import ArticlesSection from './admin/ArticlesSection';

type TabType = 'dashboard' | 'articles';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const { data: conversations = [] } = useConversations();

  if (activeTab === 'articles') {
    return <ArticlesSection setActiveTab={setActiveTab} />;
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

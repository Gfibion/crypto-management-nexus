
import React, { useState } from 'react';
import { useConversations } from '@/hooks/useChat';
import DashboardContent from './admin/DashboardContent';
import ArticlesSection from './admin/ArticlesSection';
import MessagesSection from './admin/MessagesSection';
import ContentSection from './admin/ContentSection';
import UserManagement from './admin/UserManagement';
import ContentManagement from './admin/ContentManagement';
import EmailLogsSection from './admin/EmailLogsSection';

type TabType = 'dashboard' | 'articles' | 'messages' | 'content' | 'users' | 'emails';

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
    return <ContentManagement setActiveTab={setActiveTab} />;
  }

  if (activeTab === 'users') {
    return <UserManagement setActiveTab={setActiveTab} />;
  }

  if (activeTab === 'emails') {
    return <EmailLogsSection setActiveTab={setActiveTab} />;
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

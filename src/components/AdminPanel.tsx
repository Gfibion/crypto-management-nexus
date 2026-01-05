import React, { useState } from 'react';
import { useConversations } from '@/hooks/useChat';
import DashboardContent from './admin/DashboardContent';
import ArticlesSection from './admin/ArticlesSection';
import MessagesSection from './admin/MessagesSection';
import ContentManagement from './admin/ContentManagement';
import UserManagement from './admin/UserManagement';
import EmailLogsSection from './admin/EmailLogsSection';
import NotificationPreferences from './admin/NotificationPreferences';
import CommentsManagement from './admin/CommentsManagement';
import TestimonialsManagement from './admin/TestimonialsManagement';
import ServicesManagement from './admin/ServicesManagement';

type TabType = 'dashboard' | 'articles' | 'messages' | 'content' | 'users' | 'emails' | 'notifications' | 'comments' | 'testimonials' | 'services';

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

  if (activeTab === 'notifications') {
    return <NotificationPreferences setActiveTab={setActiveTab} />;
  }

  if (activeTab === 'comments') {
    return <CommentsManagement setActiveTab={setActiveTab} />;
  }

  if (activeTab === 'testimonials') {
    return <TestimonialsManagement setActiveTab={setActiveTab} />;
  }

  if (activeTab === 'services') {
    return <ServicesManagement setActiveTab={setActiveTab} />;
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

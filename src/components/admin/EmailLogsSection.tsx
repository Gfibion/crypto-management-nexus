import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Eye, Filter, Search, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

interface EmailLogsSectionProps {
  setActiveTab: (tab: 'dashboard' | 'emails') => void;
}

const EmailLogsSection: React.FC<EmailLogsSectionProps> = ({ setActiveTab }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Fetch email logs
  const { data: emailLogs = [], isLoading } = useQuery({
    queryKey: ['email-logs', searchTerm, statusFilter, typeFilter],
    queryFn: async () => {
      let query = supabase
        .from('email_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`recipient_email.ilike.%${searchTerm}%,subject.ilike.%${searchTerm}%,recipient_name.ilike.%${searchTerm}%`);
      }

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      if (typeFilter !== 'all') {
        query = query.eq('email_type', typeFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-600';
      case 'pending': return 'bg-yellow-600';
      case 'failed': return 'bg-red-600';
      case 'bounced': return 'bg-orange-600';
      default: return 'bg-gray-600';
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'reply': return 'bg-blue-600';
      case 'manual': return 'bg-purple-600';
      case 'notification': return 'bg-indigo-600';
      case 'system': return 'bg-gray-600';
      default: return 'bg-slate-600';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-white">Loading email logs...</div>
      </div>
    );
  }

  const totalEmails = emailLogs.length;
  const sentEmails = emailLogs.filter(log => log.status === 'sent').length;
  const failedEmails = emailLogs.filter(log => log.status === 'failed').length;
  const successRate = totalEmails > 0 ? ((sentEmails / totalEmails) * 100).toFixed(1) : '0';

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
        <h2 className="text-2xl font-bold text-white">Email Management & Logs</h2>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-purple-800/30">
          <CardContent className="p-4">
            <div className="text-sm text-gray-400">Total Emails</div>
            <div className="text-2xl font-bold text-white">{totalEmails}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-purple-800/30">
          <CardContent className="p-4">
            <div className="text-sm text-gray-400">Sent Successfully</div>
            <div className="text-2xl font-bold text-green-400">{sentEmails}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-purple-800/30">
          <CardContent className="p-4">
            <div className="text-sm text-gray-400">Failed</div>
            <div className="text-2xl font-bold text-red-400">{failedEmails}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-purple-800/30">
          <CardContent className="p-4">
            <div className="text-sm text-gray-400">Success Rate</div>
            <div className="text-2xl font-bold text-blue-400">{successRate}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-slate-800/50 border-purple-800/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search emails..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700/50 border-purple-600/30 text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-slate-700/50 border-purple-600/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="bounced">Bounced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Type</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="bg-slate-700/50 border-purple-600/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="reply">Reply</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="notification">Notification</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Logs */}
      <Card className="bg-slate-800/50 border-purple-800/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Email Logs</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emailLogs.map((log) => (
              <Card key={log.id} className="bg-slate-700/50 border-purple-600/20">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          {log.subject}
                        </h3>
                        <Badge className={`${getStatusBadgeColor(log.status)} text-white`}>
                          {log.status}
                        </Badge>
                        <Badge className={`${getTypeBadgeColor(log.email_type)} text-white`}>
                          {log.email_type}
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-gray-300 space-y-1">
                        <div>
                          <strong>To:</strong> {log.recipient_name ? `${log.recipient_name} <${log.recipient_email}>` : log.recipient_email}
                        </div>
                        <div>
                          <strong>From:</strong> {log.sender_id ? `Admin (${log.sender_id})` : 'System'}
                        </div>
                        <div>
                          <strong>Sent:</strong> {log.sent_at ? format(new Date(log.sent_at), 'PPp') : 'Not sent'}
                        </div>
                        <div>
                          <strong>Created:</strong> {format(new Date(log.created_at), 'PPp')}
                        </div>
                        {log.resend_id && (
                          <div>
                            <strong>Resend ID:</strong> {log.resend_id}
                          </div>
                        )}
                        {log.error_message && (
                          <div className="text-red-400">
                            <strong>Error:</strong> {log.error_message}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-purple-600/30 text-purple-300 hover:bg-purple-600/20"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-slate-800 border-purple-800/30 max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-white">Email Details</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <strong className="text-white">Subject:</strong>
                              <p className="text-gray-300">{log.subject}</p>
                            </div>
                            <div>
                              <strong className="text-white">Message:</strong>
                              <div className="bg-slate-700/50 p-4 rounded-lg mt-2">
                                <pre className="text-gray-300 whitespace-pre-wrap text-sm">
                                  {log.message}
                                </pre>
                              </div>
                            </div>
                            {log.metadata && Object.keys(log.metadata).length > 0 && (
                              <div>
                                <strong className="text-white">Metadata:</strong>
                                <pre className="bg-slate-700/50 p-4 rounded-lg mt-2 text-sm text-gray-300">
                                  {JSON.stringify(log.metadata, null, 2)}
                                </pre>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>

                      {log.resend_id && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`https://resend.com/emails/${log.resend_id}`, '_blank')}
                          className="border-green-600/30 text-green-300 hover:bg-green-600/20"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {emailLogs.length === 0 && (
              <div className="text-center py-12">
                <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-4">No Email Logs</h3>
                <p className="text-gray-300">No emails have been sent yet or match your filters.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailLogsSection;
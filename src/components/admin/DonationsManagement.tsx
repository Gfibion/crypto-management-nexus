import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, TrendingUp, Users, DollarSign, Download, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface Donation {
  id: string;
  email: string;
  donor_name: string | null;
  amount: number;
  currency: string;
  reference: string;
  channel: string | null;
  status: string;
  paid_at: string | null;
  created_at: string;
}

const DonationsManagement = () => {
  const { toast } = useToast();

  const { data: donations, isLoading, error, refetch } = useQuery({
    queryKey: ['admin-donations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Donation[];
    },
  });

  const totalAmount = donations?.reduce((sum, d) => sum + Number(d.amount), 0) || 0;
  const uniqueDonors = new Set(donations?.map(d => d.email)).size;
  const thisMonthDonations = donations?.filter(d => {
    const donationDate = new Date(d.created_at);
    const now = new Date();
    return donationDate.getMonth() === now.getMonth() && 
           donationDate.getFullYear() === now.getFullYear();
  }) || [];
  const thisMonthTotal = thisMonthDonations.reduce((sum, d) => sum + Number(d.amount), 0);

  const exportToCSV = () => {
    if (!donations || donations.length === 0) {
      toast({
        title: "No data to export",
        description: "There are no donations to export.",
        variant: "destructive",
      });
      return;
    }

    const headers = ['Date', 'Donor Name', 'Email', 'Amount', 'Currency', 'Channel', 'Reference', 'Status'];
    const csvContent = [
      headers.join(','),
      ...donations.map(d => [
        format(new Date(d.created_at), 'yyyy-MM-dd HH:mm'),
        d.donor_name || 'Anonymous',
        d.email,
        d.amount,
        d.currency,
        d.channel || 'N/A',
        d.reference,
        d.status
      ].map(val => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `donations_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();

    toast({
      title: "Export successful",
      description: "Donations exported to CSV file.",
    });
  };

  if (error) {
    return (
      <div className="p-4 text-red-400">
        Error loading donations: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/30 border-green-500/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-300">Total Raised</p>
                <p className="text-2xl font-bold text-white">
                  KES {totalAmount.toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 border-blue-500/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-300">This Month</p>
                <p className="text-2xl font-bold text-white">
                  KES {thisMonthTotal.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/30 border-purple-500/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-300">Total Donations</p>
                <p className="text-2xl font-bold text-white">
                  {donations?.length || 0}
                </p>
              </div>
              <Heart className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/50 to-amber-900/30 border-orange-500/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-300">Unique Donors</p>
                <p className="text-2xl font-bold text-white">{uniqueDonors}</p>
              </div>
              <Users className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Donations Table */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-400" />
            Donation History
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={exportToCSV}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <Download className="h-4 w-4 mr-1" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-gray-400">Loading donations...</div>
          ) : donations && donations.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-gray-300">Date</TableHead>
                    <TableHead className="text-gray-300">Donor</TableHead>
                    <TableHead className="text-gray-300">Email</TableHead>
                    <TableHead className="text-gray-300">Amount</TableHead>
                    <TableHead className="text-gray-300">Channel</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {donations.map((donation) => (
                    <TableRow key={donation.id} className="border-slate-700">
                      <TableCell className="text-gray-300">
                        {format(new Date(donation.created_at), 'MMM dd, yyyy HH:mm')}
                      </TableCell>
                      <TableCell className="text-white font-medium">
                        {donation.donor_name || 'Anonymous'}
                      </TableCell>
                      <TableCell className="text-gray-300">{donation.email}</TableCell>
                      <TableCell className="text-green-400 font-semibold">
                        {donation.currency} {Number(donation.amount).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {donation.channel || 'N/A'}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={donation.status === 'success' ? 'default' : 'destructive'}
                          className={donation.status === 'success' 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : ''}
                        >
                          {donation.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              No donations yet. Donations will appear here once received.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationsManagement;

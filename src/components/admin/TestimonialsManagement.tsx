import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Check, X, Trash2, Star, Award, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface TestimonialsManagementProps {
  setActiveTab: (tab: any) => void;
}

const TestimonialsManagement: React.FC<TestimonialsManagementProps> = ({ setActiveTab }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  // Fetch testimonials with user info
  const { data: testimonialsData = [], isLoading } = useQuery({
    queryKey: ['admin-testimonials', statusFilter],
    queryFn: async () => {
      let query = supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;

      // Fetch user profiles
      const userIds = [...new Set(data.map(t => t.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url, bio')
        .in('id', userIds);

      // Combine data
      return data.map(testimonial => ({
        ...testimonial,
        user: profiles?.find(p => p.id === testimonial.user_id),
      }));
    },
  });

  const testimonials = testimonialsData;

  // Update testimonial status
  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('testimonials')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast({
        title: 'Success',
        description: 'Testimonial status updated',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update testimonial',
        variant: 'destructive',
      });
    },
  });

  // Toggle featured status
  const toggleFeatured = useMutation({
    mutationFn: async ({ id, featured }: { id: string; featured: boolean }) => {
      const { error } = await supabase
        .from('testimonials')
        .update({ featured: !featured, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast({
        title: 'Success',
        description: 'Featured status updated',
      });
    },
  });

  // Delete testimonial
  const deleteTestimonial = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast({
        title: 'Success',
        description: 'Testimonial deleted',
      });
    },
  });

  // Get stats
  const pending = testimonials.filter(t => t.status === 'pending').length;
  const approved = testimonials.filter(t => t.status === 'approved').length;
  const featured = testimonials.filter(t => t.featured).length;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div className="mb-4">
        <Button 
          onClick={() => setActiveTab('dashboard')}
          variant="outline"
          className="border-purple-600/30 text-purple-300 hover:bg-purple-600/20"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Award className="h-6 w-6 text-purple-400" />
            Testimonials Management
          </h2>
          <p className="text-gray-400 mt-1">
            {testimonials.length} total • {approved} approved • {pending} pending • {featured} featured
          </p>
        </div>
      </div>

      {/* Status filters */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={statusFilter === 'all' ? 'default' : 'outline'}
          onClick={() => setStatusFilter('all')}
          size="sm"
        >
          All ({testimonials.length})
        </Button>
        <Button
          variant={statusFilter === 'pending' ? 'default' : 'outline'}
          onClick={() => setStatusFilter('pending')}
          size="sm"
        >
          Pending ({pending})
        </Button>
        <Button
          variant={statusFilter === 'approved' ? 'default' : 'outline'}
          onClick={() => setStatusFilter('approved')}
          size="sm"
        >
          Approved ({approved})
        </Button>
        <Button
          variant={statusFilter === 'rejected' ? 'default' : 'outline'}
          onClick={() => setStatusFilter('rejected')}
          size="sm"
        >
          Rejected
        </Button>
      </div>

      {/* Testimonials list */}
      <div className="space-y-4">
        {isLoading ? (
          <Card className="bg-slate-800/50 border-purple-800/30 p-6">
            <p className="text-gray-400 text-center">Loading testimonials...</p>
          </Card>
        ) : testimonials.length === 0 ? (
          <Card className="bg-slate-800/50 border-purple-800/30 p-6">
            <p className="text-gray-400 text-center">No testimonials found</p>
          </Card>
        ) : (
          testimonials.map(testimonial => (
            <Card
              key={testimonial.id}
              className="bg-slate-800/50 border-purple-800/30 hover:border-purple-600/50 transition-colors"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-white font-medium">
                        {testimonial.user?.full_name || 'Anonymous'}
                      </span>
                      {testimonial.role && (
                        <span className="text-purple-400 text-sm">• {testimonial.role}</span>
                      )}
                      {testimonial.company && (
                        <span className="text-gray-400 text-sm">@ {testimonial.company}</span>
                      )}
                    </div>

                    <p className="text-gray-300 leading-relaxed italic">"{testimonial.message}"</p>

                    <div className="flex items-center gap-2">
                      {testimonial.rating && (
                        <div className="flex items-center gap-1">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      )}
                      
                      <Badge
                        variant="outline"
                        className={
                          testimonial.status === 'approved'
                            ? 'border-green-600/50 text-green-400'
                            : testimonial.status === 'pending'
                            ? 'border-yellow-600/50 text-yellow-400'
                            : 'border-red-600/50 text-red-400'
                        }
                      >
                        {testimonial.status}
                      </Badge>

                      {testimonial.featured && (
                        <Badge className="bg-purple-600">Featured</Badge>
                      )}

                      <span className="text-gray-400 text-xs ml-auto">
                        {format(new Date(testimonial.created_at), 'MMM d, yyyy')}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {testimonial.status !== 'approved' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateStatus.mutate({ id: testimonial.id, status: 'approved' })}
                        className="border-green-600/30 text-green-400 hover:bg-green-600/20"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    
                    {testimonial.status !== 'rejected' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateStatus.mutate({ id: testimonial.id, status: 'rejected' })}
                        className="border-orange-600/30 text-orange-400 hover:bg-orange-600/20"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}

                    {testimonial.status === 'approved' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleFeatured.mutate({ id: testimonial.id, featured: testimonial.featured })}
                        className="border-purple-600/30 text-purple-400 hover:bg-purple-600/20"
                      >
                        <Award className="h-4 w-4" />
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteTestimonial.mutate(testimonial.id)}
                      className="border-red-600/30 text-red-400 hover:bg-red-600/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default TestimonialsManagement;

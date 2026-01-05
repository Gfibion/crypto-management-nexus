import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, Plus, Edit, Trash2, Briefcase, Star, DollarSign, Tag } from 'lucide-react';
import { toast } from 'sonner';

interface ServicesManagementProps {
  setActiveTab: (tab: 'dashboard' | 'articles' | 'messages' | 'content' | 'users' | 'emails' | 'notifications' | 'comments' | 'testimonials' | 'services') => void;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  category_id: string | null;
  price_range: string | null;
  tags: string[] | null;
  featured: boolean | null;
  active: boolean | null;
  created_at: string;
  updated_at: string;
}

interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

const ServicesManagement: React.FC<ServicesManagementProps> = ({ setActiveTab }) => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    category_id: '',
    price_range: '',
    tags: '',
    featured: false,
    active: true,
  });

  // Fetch services
  const { data: services = [], isLoading: servicesLoading } = useQuery({
    queryKey: ['admin-services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Service[];
    },
  });

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ['service-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('service_categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as ServiceCategory[];
    },
  });

  // Create/Update service mutation
  const saveMutation = useMutation({
    mutationFn: async (data: typeof formData & { id?: string }) => {
      const serviceData = {
        title: data.title,
        description: data.description,
        icon: data.icon || null,
        category_id: data.category_id || null,
        price_range: data.price_range || null,
        tags: data.tags ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        featured: data.featured,
        active: data.active,
      };

      if (data.id) {
        const { error } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', data.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('services')
          .insert(serviceData);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      toast.success(editingService ? 'Service updated successfully' : 'Service created successfully');
      resetForm();
    },
    onError: (error) => {
      toast.error('Failed to save service: ' + error.message);
    },
  });

  // Delete service mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      toast.success('Service deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete service: ' + error.message);
    },
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: '',
      category_id: '',
      price_range: '',
      tags: '',
      featured: false,
      active: true,
    });
    setEditingService(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon || '',
      category_id: service.category_id || '',
      price_range: service.price_range || '',
      tags: service.tags?.join(', ') || '',
      featured: service.featured || false,
      active: service.active ?? true,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error('Title and description are required');
      return;
    }
    saveMutation.mutate({ ...formData, id: editingService?.id });
  };

  const getCategoryName = (categoryId: string | null) => {
    if (!categoryId) return 'Uncategorized';
    const category = categories.find(c => c.id === categoryId);
    return category?.name || 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab('dashboard')}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center space-x-2">
            <Briefcase className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-white">Services Management</h2>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => resetForm()}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-purple-800/30 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-gray-300">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Service title"
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-gray-300">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Service description"
                  className="bg-slate-700 border-slate-600 text-white min-h-[100px]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category" className="text-gray-300">Category</Label>
                  <Select
                    value={formData.category_id}
                    onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id} className="text-white hover:bg-slate-600">
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="icon" className="text-gray-300">Icon (lucide icon name)</Label>
                  <Input
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="e.g., briefcase, zap, cloud"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price_range" className="text-gray-300">Price Range</Label>
                  <Input
                    id="price_range"
                    value={formData.price_range}
                    onChange={(e) => setFormData({ ...formData, price_range: e.target.value })}
                    placeholder="e.g., $500 - $2,000"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="tags" className="text-gray-300">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="e.g., consulting, strategy, growth"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  />
                  <Label htmlFor="featured" className="text-gray-300">Featured</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                  />
                  <Label htmlFor="active" className="text-gray-300">Active</Label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  className="border-slate-600 text-gray-300 hover:bg-slate-700"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={saveMutation.isPending}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  {saveMutation.isPending ? 'Saving...' : editingService ? 'Update Service' : 'Create Service'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-purple-800/30 p-4">
          <div className="flex items-center space-x-3">
            <Briefcase className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-400">Total Services</p>
              <p className="text-2xl font-bold text-white">{services.length}</p>
            </div>
          </div>
        </Card>
        <Card className="bg-slate-800/50 border-purple-800/30 p-4">
          <div className="flex items-center space-x-3">
            <Star className="h-8 w-8 text-yellow-500" />
            <div>
              <p className="text-sm text-gray-400">Featured</p>
              <p className="text-2xl font-bold text-white">{services.filter(s => s.featured).length}</p>
            </div>
          </div>
        </Card>
        <Card className="bg-slate-800/50 border-purple-800/30 p-4">
          <div className="flex items-center space-x-3">
            <Tag className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-sm text-gray-400">Active</p>
              <p className="text-2xl font-bold text-white">{services.filter(s => s.active).length}</p>
            </div>
          </div>
        </Card>
        <Card className="bg-slate-800/50 border-purple-800/30 p-4">
          <div className="flex items-center space-x-3">
            <DollarSign className="h-8 w-8 text-purple-500" />
            <div>
              <p className="text-sm text-gray-400">Categories</p>
              <p className="text-2xl font-bold text-white">{categories.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Services List */}
      <Card className="bg-slate-800/50 border-purple-800/30 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">All Services</h3>
        
        {servicesLoading ? (
          <p className="text-gray-400 text-center py-8">Loading services...</p>
        ) : services.length === 0 ? (
          <div className="text-center py-8">
            <Briefcase className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">No services found. Add your first service!</p>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-slate-600/50 hover:border-purple-600/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-white">{service.title}</h4>
                    {service.featured && (
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                        Featured
                      </Badge>
                    )}
                    {!service.active && (
                      <Badge variant="outline" className="border-red-500/30 text-red-400">
                        Inactive
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-2 mb-2">{service.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>Category: {getCategoryName(service.category_id)}</span>
                    {service.price_range && <span>Price: {service.price_range}</span>}
                    {service.tags && service.tags.length > 0 && (
                      <span>Tags: {service.tags.slice(0, 3).join(', ')}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(service)}
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this service?')) {
                        deleteMutation.mutate(service.id);
                      }
                    }}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ServicesManagement;

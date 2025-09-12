
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Settings, Edit, Trash2, Plus, Upload, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { populateAllAdminData } from '@/utils/populateAdminData';
import AutoArticleManager from './AutoArticleManager';

interface ContentManagementProps {
  setActiveTab: (tab: 'dashboard' | 'content') => void;
}

const ContentManagement: React.FC<ContentManagementProps> = ({ setActiveTab }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [activeContentTab, setActiveContentTab] = useState<'projects' | 'services' | 'skills' | 'education' | 'contact' | 'articles'>('projects');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [isPopulating, setIsPopulating] = useState(false);

  // Fetch different content types
  const { data: projects = [] } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: async () => {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: services = [] } = useQuery({
    queryKey: ['admin-services'],
    queryFn: async () => {
      const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: skills = [] } = useQuery({
    queryKey: ['admin-skills'],
    queryFn: async () => {
      const { data, error } = await supabase.from('skills').select('*').order('category', { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const { data: education = [] } = useQuery({
    queryKey: ['admin-education'],
    queryFn: async () => {
      const { data, error } = await supabase.from('education').select('*').order('start_year', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: contactMessages = [] } = useQuery({
    queryKey: ['admin-contact-messages'],
    queryFn: async () => {
      const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  // Generic mutations for CRUD operations
  const createItem = useMutation({
    mutationFn: async ({ table, data }: { table: string; data: any }) => {
      const { data: result, error } = await supabase.from(table as any).insert(data).select();
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`admin-${activeContentTab}`] });
      queryClient.invalidateQueries({ queryKey: [activeContentTab] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      queryClient.invalidateQueries({ queryKey: ['education'] });
      
      setEditingItem(null);
      setFormData({});
      toast({ 
        title: "Success", 
        description: `${activeContentTab.slice(0, -1).charAt(0).toUpperCase() + activeContentTab.slice(1, -1)} created successfully` 
      });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to create item",
        variant: "destructive"
      });
    }
  });

  const updateItem = useMutation({
    mutationFn: async ({ table, id, data }: { table: string; id: string; data: any }) => {
      const { data: result, error } = await supabase.from(table as any).update(data).eq('id', id).select();
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`admin-${activeContentTab}`] });
      queryClient.invalidateQueries({ queryKey: [activeContentTab] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      queryClient.invalidateQueries({ queryKey: ['education'] });
      
      setEditingItem(null);
      setFormData({});
      toast({ 
        title: "Success", 
        description: `${activeContentTab.slice(0, -1).charAt(0).toUpperCase() + activeContentTab.slice(1, -1)} updated successfully` 
      });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to update item",
        variant: "destructive"
      });
    }
  });

  const deleteItem = useMutation({
    mutationFn: async ({ table, id }: { table: string; id: string }) => {
      const { error } = await supabase.from(table as any).delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`admin-${activeContentTab}`] });
      queryClient.invalidateQueries({ queryKey: [activeContentTab] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      queryClient.invalidateQueries({ queryKey: ['education'] });
      
      toast({ 
        title: "Success", 
        description: `${activeContentTab.slice(0, -1).charAt(0).toUpperCase() + activeContentTab.slice(1, -1)} deleted successfully` 
      });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to delete item",
        variant: "destructive"
      });
    }
  });

  // Populate admin data function
  const handlePopulateData = async () => {
    setIsPopulating(true);
    try {
      await populateAllAdminData();
      // Refresh all queries
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      queryClient.invalidateQueries({ queryKey: ['admin-skills'] });
      toast({
        title: "Success",
        description: "Admin data populated successfully with comprehensive services and skills",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to populate admin data",
        variant: "destructive"
      });
    } finally {
      setIsPopulating(false);
    }
  };

  const getCurrentData = () => {
    switch (activeContentTab) {
      case 'projects': return projects;
      case 'services': return services;
      case 'skills': return skills;
      case 'education': return education;
      case 'contact': return contactMessages;
      default: return [];
    }
  };

  const renderItemCard = (item: any) => {
    const getTitle = () => {
      switch (activeContentTab) {
        case 'projects': return item.title;
        case 'services': return item.title;
        case 'skills': return item.name;
        case 'education': return `${item.degree} - ${item.institution}`;
        case 'contact': return `${item.name} - ${item.subject || 'No Subject'}`;
        default: return 'Unknown';
      }
    };

    const getDescription = () => {
      switch (activeContentTab) {
        case 'projects': return item.description;
        case 'services': return item.description;
        case 'skills': return `${item.category} - Level ${item.proficiency_level}/10`;
        case 'education': return `${item.field_of_study} (${item.start_year}-${item.end_year || 'Present'})`;
        case 'contact': return item.message?.substring(0, 100) + '...';
        default: return '';
      }
    };

    const getBadges = () => {
      const badges = [];
      
      if (activeContentTab === 'contact') {
        if (item.read) badges.push(<Badge key="read" className="bg-green-600">Read</Badge>);
        if (item.replied) badges.push(<Badge key="replied" className="bg-blue-600">Replied</Badge>);
        if (!item.read) badges.push(<Badge key="unread" className="bg-red-600">Unread</Badge>);
      } else {
        if (item.featured) badges.push(<Badge key="featured" className="bg-yellow-600">Featured</Badge>);
        if (item.active !== undefined) {
          badges.push(<Badge key="active" className={item.active ? "bg-green-600" : "bg-gray-600"}>
            {item.active ? 'Active' : 'Inactive'}
          </Badge>);
        }
        if (item.status) badges.push(<Badge key="status" variant="outline">{item.status}</Badge>);
      }
      
      return badges;
    };

    return (
      <Card key={item.id} className="bg-slate-700/50 border-purple-600/20 hover:border-red-400/40 transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">{getTitle()}</h3>
              <p className="text-gray-300 text-sm mb-2">{getDescription()}</p>
              {activeContentTab === 'contact' && (
                <p className="text-gray-400 text-xs mb-2">
                  {item.email} • {new Date(item.created_at).toLocaleDateString()}
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                {getBadges()}
              </div>
            </div>
            <div className="flex gap-2 ml-4">
              {activeContentTab !== 'contact' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingItem(item);
                    setFormData(item);
                  }}
                  className="border-blue-600/30 text-blue-300 hover:bg-blue-600/20"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => deleteItem.mutate({ table: activeContentTab === 'contact' ? 'contact_messages' : activeContentTab, id: item.id })}
                className="border-red-600/30 text-red-300 hover:bg-red-600/20"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderForm = () => {
    const isEditing = !!editingItem;
    
    return (
      <Dialog open={isEditing} onOpenChange={(open) => !open && setEditingItem(null)}>
        <DialogContent className="bg-slate-800 border-purple-800/30 max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">
              {isEditing ? 'Edit' : 'Create'} {activeContentTab.slice(0, -1).charAt(0).toUpperCase() + activeContentTab.slice(0, -1).slice(1)}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {activeContentTab === 'projects' && (
              <>
                <Input
                  placeholder="Project Title"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="bg-slate-700/50 border-purple-600/30 text-white"
                />
                <Textarea
                  placeholder="Project Description"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="bg-slate-700/50 border-purple-600/30 text-white min-h-[100px]"
                />
                <Input
                  placeholder="Technologies (comma-separated)"
                  value={formData.technologies?.join(', ') || ''}
                  onChange={(e) => setFormData({...formData, technologies: e.target.value.split(', ').filter(t => t.trim())})}
                  className="bg-slate-700/50 border-purple-600/30 text-white"
                />
                <Input
                  placeholder="Project URL"
                  value={formData.project_url || ''}
                  onChange={(e) => setFormData({...formData, project_url: e.target.value})}
                  className="bg-slate-700/50 border-purple-600/30 text-white"
                />
                <Input
                  placeholder="GitHub URL"
                  value={formData.github_url || ''}
                  onChange={(e) => setFormData({...formData, github_url: e.target.value})}
                  className="bg-slate-700/50 border-purple-600/30 text-white"
                />
                <Select
                  value={formData.status || 'completed'}
                  onValueChange={(value) => setFormData({...formData, status: value})}
                >
                  <SelectTrigger className="bg-slate-700/50 border-purple-600/30 text-white">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="planned">Planned</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured || false}
                    onCheckedChange={(checked) => setFormData({...formData, featured: checked})}
                  />
                  <Label htmlFor="featured" className="text-white">Featured Project</Label>
                </div>
              </>
            )}

            {activeContentTab === 'services' && (
              <>
                <Input
                  placeholder="Service Title"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="bg-slate-700/50 border-purple-600/30 text-white"
                />
                <Textarea
                  placeholder="Service Description"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="bg-slate-700/50 border-purple-600/30 text-white min-h-[100px]"
                />
                <Select
                  value={formData.category || ''}
                  onValueChange={(value) => setFormData({...formData, category: value})}
                >
                  <SelectTrigger className="bg-slate-700/50 border-purple-600/30 text-white">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Business Management">Business Management</SelectItem>
                    <SelectItem value="ICT & Technology">ICT & Technology</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Features (one per line)"
                  value={Array.isArray(formData.features) ? formData.features.join('\n') : ''}
                  onChange={(e) => setFormData({...formData, features: e.target.value.split('\n').filter(f => f.trim())})}
                  className="bg-slate-700/50 border-purple-600/30 text-white min-h-[100px]"
                />
                <Input
                  placeholder="Price Range (e.g., $1,000 - $5,000)"
                  value={formData.price_range || ''}
                  onChange={(e) => setFormData({...formData, price_range: e.target.value})}
                  className="bg-slate-700/50 border-purple-600/30 text-white"
                />
                <Input
                  placeholder="Icon (e.g., pie-chart, code, etc.)"
                  value={formData.icon || ''}
                  onChange={(e) => setFormData({...formData, icon: e.target.value})}
                  className="bg-slate-700/50 border-purple-600/30 text-white"
                />
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="active"
                      checked={formData.active !== false}
                      onCheckedChange={(checked) => setFormData({...formData, active: checked})}
                    />
                    <Label htmlFor="active" className="text-white">Active Service</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={formData.featured || false}
                      onCheckedChange={(checked) => setFormData({...formData, featured: checked})}
                    />
                    <Label htmlFor="featured" className="text-white">Featured Service</Label>
                  </div>
                </div>
              </>
            )}

            {activeContentTab === 'skills' && (
              <>
                <Input
                  placeholder="Skill Name"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-slate-700/50 border-purple-600/30 text-white"
                />
                <Select
                  value={formData.category || ''}
                  onValueChange={(value) => setFormData({...formData, category: value})}
                >
                  <SelectTrigger className="bg-slate-700/50 border-purple-600/30 text-white">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Strategic Management">Strategic Management</SelectItem>
                    <SelectItem value="Operations & Leadership">Operations & Leadership</SelectItem>
                    <SelectItem value="Financial Management">Financial Management</SelectItem>
                    <SelectItem value="Business Development">Business Development</SelectItem>
                    <SelectItem value="Innovation & Entrepreneurship">Innovation & Entrepreneurship</SelectItem>
                    <SelectItem value="Software Development">Software Development</SelectItem>
                    <SelectItem value="System Architecture">System Architecture</SelectItem>
                    <SelectItem value="Data & Analytics">Data & Analytics</SelectItem>
                    <SelectItem value="Infrastructure & Security">Infrastructure & Security</SelectItem>
                    <SelectItem value="Consulting">Consulting</SelectItem>
                  </SelectContent>
                </Select>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white text-sm">Proficiency Level (1-10)</Label>
                    <Input
                      type="number"
                      min="1"
                      max="10"
                      placeholder="Proficiency Level"
                      value={formData.proficiency_level || ''}
                      onChange={(e) => setFormData({...formData, proficiency_level: parseInt(e.target.value)})}
                      className="bg-slate-700/50 border-purple-600/30 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white text-sm">Years of Experience</Label>
                    <Input
                      type="number"
                      placeholder="Years"
                      value={formData.years_experience || ''}
                      onChange={(e) => setFormData({...formData, years_experience: parseInt(e.target.value)})}
                      className="bg-slate-700/50 border-purple-600/30 text-white"
                    />
                  </div>
                </div>
                <Textarea
                  placeholder="Skill Description"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="bg-slate-700/50 border-purple-600/30 text-white"
                />
                <Input
                  placeholder="Icon (e.g., target, users, etc.)"
                  value={formData.icon || ''}
                  onChange={(e) => setFormData({...formData, icon: e.target.value})}
                  className="bg-slate-700/50 border-purple-600/30 text-white"
                />
              </>
            )}

            {activeContentTab === 'education' && (
              <>
                <Input
                  placeholder="Qualification/Certification"
                  value={formData.degree || ''}
                  onChange={(e) => setFormData({...formData, degree: e.target.value})}
                  className="bg-slate-700/50 border-purple-600/30 text-white"
                />
                <Input
                  placeholder="Institution"
                  value={formData.institution || ''}
                  onChange={(e) => setFormData({...formData, institution: e.target.value})}
                  className="bg-slate-700/50 border-purple-600/30 text-white"
                />
                <Input
                  placeholder="Field of Study"
                  value={formData.field_of_study || ''}
                  onChange={(e) => setFormData({...formData, field_of_study: e.target.value})}
                  className="bg-slate-700/50 border-purple-600/30 text-white"
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white text-sm">Start Year</Label>
                    <Input
                      type="number"
                      placeholder="Start Year"
                      value={formData.start_year || ''}
                      onChange={(e) => setFormData({...formData, start_year: parseInt(e.target.value)})}
                      className="bg-slate-700/50 border-purple-600/30 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white text-sm">End Year (Leave empty if ongoing)</Label>
                    <Input
                      type="number"
                      placeholder="End Year"
                      value={formData.end_year || ''}
                      onChange={(e) => setFormData({...formData, end_year: parseInt(e.target.value)})}
                      className="bg-slate-700/50 border-purple-600/30 text-white"
                    />
                  </div>
                </div>
                <Input
                  placeholder="Grade/GPA (optional)"
                  value={formData.grade || ''}
                  onChange={(e) => setFormData({...formData, grade: e.target.value})}
                  className="bg-slate-700/50 border-purple-600/30 text-white"
                />
                <Textarea
                  placeholder="Description/Achievements"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="bg-slate-700/50 border-purple-600/30 text-white"
                />
              </>
            )}

            <div className="flex gap-2 justify-end pt-4">
              <Button
                variant="outline"
                onClick={() => setEditingItem(null)}
                className="border-gray-600 text-gray-300 hover:bg-gray-600/20"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (isEditing) {
                    updateItem.mutate({ table: activeContentTab, id: editingItem.id, data: formData });
                  } else {
                    createItem.mutate({ table: activeContentTab, data: formData });
                  }
                }}
                className="bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white"
                disabled={createItem.isPending || updateItem.isPending}
              >
                {createItem.isPending || updateItem.isPending ? 'Saving...' : (isEditing ? 'Update' : 'Create')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          onClick={() => setActiveTab('dashboard')}
          className="border-purple-600/30 text-purple-300 hover:bg-purple-600/20"
        >
          ← Back to Dashboard
        </Button>
        <h2 className="text-2xl font-bold text-white">Content Management</h2>
      </div>

      {/* Content Type Tabs */}
      <div className="flex flex-wrap gap-2 bg-slate-800/50 p-3 rounded-lg border border-purple-600/20">
        {['projects', 'services', 'skills', 'education', 'contact', 'articles'].map((tab) => (
          <Button
            key={tab}
            variant={activeContentTab === tab ? 'default' : 'outline'}
            onClick={() => setActiveContentTab(tab as any)}
            className={`capitalize transition-all duration-300 ${
              activeContentTab === tab 
                ? 'bg-gradient-to-r from-purple-600 to-red-600 text-white shadow-lg' 
                : 'border-purple-600/30 text-purple-300 hover:bg-purple-600/20 hover:border-red-400/40'
            }`}
          >
            {tab === 'contact' ? 'Contact Messages' : tab === 'articles' ? 'Article Automation' : tab}
          </Button>
        ))}
      </div>

      {activeContentTab === 'articles' ? (
        <AutoArticleManager />
      ) : (
        <Card className="bg-slate-800/50 border-purple-800/30 hover:border-red-400/30 transition-all duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center space-x-2">
              <Settings className="h-5 w-5 text-purple-400" />
              <span>Manage {activeContentTab.charAt(0).toUpperCase() + activeContentTab.slice(1)}</span>
            </CardTitle>
            <div className="flex gap-2">
              {(activeContentTab === 'services' || activeContentTab === 'skills') && (
                <Button
                  onClick={handlePopulateData}
                  disabled={isPopulating}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isPopulating ? 'animate-spin' : ''}`} />
                  {isPopulating ? 'Populating...' : 'Populate Data'}
                </Button>
              )}
              {activeContentTab !== 'contact' && (
                <Button
                  onClick={() => {
                    setEditingItem({});
                    setFormData({});
                  }}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {getCurrentData().map(renderItemCard)}
            {getCurrentData().length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <div className="mb-4">
                  <Settings className="h-12 w-12 mx-auto text-gray-600" />
                </div>
                <h3 className="text-lg font-medium mb-2">No {activeContentTab} found</h3>
                <p className="mb-4">
                  {activeContentTab === 'contact' 
                    ? 'No contact messages received yet.' 
                    : `Create your first ${activeContentTab.slice(0, -1)} item!`
                  }
                </p>
                {activeContentTab !== 'contact' && (
                  <Button
                    onClick={() => {
                      setEditingItem({});
                      setFormData({});
                    }}
                    className="bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create {activeContentTab.slice(0, -1)}
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
        </Card>
      )}

      {renderForm()}
    </div>
  );
};

export default ContentManagement;

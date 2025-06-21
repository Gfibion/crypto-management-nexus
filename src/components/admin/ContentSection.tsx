
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Settings, Edit, Trash2, Plus, Briefcase, GraduationCap, Wrench, FolderOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContentSectionProps {
  setActiveTab: (tab: 'dashboard' | 'articles' | 'messages' | 'content') => void;
}

const ContentSection: React.FC<ContentSectionProps> = ({ setActiveTab }) => {
  const [activeContentTab, setActiveContentTab] = useState<'services' | 'projects' | 'skills' | 'education'>('services');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch services
  const { data: services = [] } = useQuery({
    queryKey: ['admin-services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: activeContentTab === 'services',
  });

  // Fetch projects
  const { data: projects = [] } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: activeContentTab === 'projects',
  });

  // Fetch skills
  const { data: skills = [] } = useQuery({
    queryKey: ['admin-skills'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('category', { ascending: true });
      
      if (error) throw error;
      return data;
    },
    enabled: activeContentTab === 'skills',
  });

  // Fetch education
  const { data: education = [] } = useQuery({
    queryKey: ['admin-education'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .order('start_year', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: activeContentTab === 'education',
  });

  const renderServices = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-white">Services Management</h3>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>
      
      {services.map((service) => (
        <Card key={service.id} className="bg-slate-700/50 border-purple-800/30">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-white">{service.title}</h4>
                <p className="text-gray-300 text-sm mt-1">{service.description}</p>
                <div className="flex gap-2 mt-2">
                  {service.featured && <Badge className="bg-yellow-600">Featured</Badge>}
                  {service.active && <Badge className="bg-green-600">Active</Badge>}
                  {service.price_range && <Badge variant="outline">{service.price_range}</Badge>}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-green-600/30 text-green-300">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="border-red-600/30 text-red-300">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-white">Projects Management</h3>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>
      
      {projects.map((project) => (
        <Card key={project.id} className="bg-slate-700/50 border-purple-800/30">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-white">{project.title}</h4>
                <p className="text-gray-300 text-sm mt-1">{project.description}</p>
                <div className="flex gap-2 mt-2">
                  {project.featured && <Badge className="bg-yellow-600">Featured</Badge>}
                  {project.status && <Badge variant="outline">{project.status}</Badge>}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-green-600/30 text-green-300">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="border-red-600/30 text-red-300">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-white">Skills Management</h3>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
          <Plus className="h-4 w-4 mr-2" />
          Add Skill
        </Button>
      </div>
      
      {skills.map((skill) => (
        <Card key={skill.id} className="bg-slate-700/50 border-purple-800/30">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-white">{skill.name}</h4>
                <p className="text-gray-300 text-sm mt-1">{skill.description}</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline">{skill.category}</Badge>
                  <Badge className="bg-blue-600">Level {skill.proficiency_level}</Badge>
                  {skill.years_experience && <Badge variant="outline">{skill.years_experience} years</Badge>}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-green-600/30 text-green-300">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="border-red-600/30 text-red-300">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-white">Education Management</h3>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </div>
      
      {education.map((edu) => (
        <Card key={edu.id} className="bg-slate-700/50 border-purple-800/30">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-white">{edu.degree}</h4>
                <p className="text-purple-300">{edu.institution}</p>
                {edu.field_of_study && <p className="text-gray-300 text-sm">{edu.field_of_study}</p>}
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline">{edu.start_year} - {edu.end_year || 'Present'}</Badge>
                  {edu.grade && <Badge className="bg-green-600">{edu.grade}</Badge>}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-green-600/30 text-green-300">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="border-red-600/30 text-red-300">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

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
        <h2 className="text-2xl font-bold text-white">Content Management</h2>
      </div>

      {/* Content Type Tabs */}
      <div className="flex space-x-2 bg-slate-800/50 p-2 rounded-lg">
        <Button
          variant={activeContentTab === 'services' ? 'default' : 'ghost'}
          onClick={() => setActiveContentTab('services')}
          className="flex-1"
        >
          <Briefcase className="h-4 w-4 mr-2" />
          Services
        </Button>
        <Button
          variant={activeContentTab === 'projects' ? 'default' : 'ghost'}
          onClick={() => setActiveContentTab('projects')}
          className="flex-1"
        >
          <FolderOpen className="h-4 w-4 mr-2" />
          Projects
        </Button>
        <Button
          variant={activeContentTab === 'skills' ? 'default' : 'ghost'}
          onClick={() => setActiveContentTab('skills')}
          className="flex-1"
        >
          <Wrench className="h-4 w-4 mr-2" />
          Skills
        </Button>
        <Button
          variant={activeContentTab === 'education' ? 'default' : 'ghost'}
          onClick={() => setActiveContentTab('education')}
          className="flex-1"
        >
          <GraduationCap className="h-4 w-4 mr-2" />
          Education
        </Button>
      </div>

      {/* Content based on active tab */}
      {activeContentTab === 'services' && renderServices()}
      {activeContentTab === 'projects' && renderProjects()}
      {activeContentTab === 'skills' && renderSkills()}
      {activeContentTab === 'education' && renderEducation()}
    </div>
  );
};

export default ContentSection;

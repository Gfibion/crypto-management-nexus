
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { skillsData } from '@/components/skills/skillsData';

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      console.log('Fetching services...');
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('active', true)
        .order('featured', { ascending: false });
      
      if (error) {
        console.error('Error fetching services:', error);
        throw error;
      }
      console.log('Services fetched successfully:', data);
      return data;
    },
  });
};

export const useSkills = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      console.log('Fetching skills from database...');
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('proficiency_level', { ascending: false });
      
      if (error) {
        console.error('Error fetching skills:', error);
        throw error;
      }
      
      // If no skills in database, return transformed static data
      if (!data || data.length === 0) {
        console.log('No skills in database, using static data');
        const transformedSkills = Object.entries(skillsData).flatMap(([category, skills]) =>
          skills.map((skill, index) => ({
            id: `${category.toLowerCase()}-${index}`,
            name: skill.name,
            category,
            proficiency_level: skill.level,
            icon: skill.icon,
            years_experience: 1,
            description: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }))
        );
        return transformedSkills;
      }
      
      console.log('Skills fetched from database:', data);
      return data;
    },
  });
};

export const useEducation = () => {
  return useQuery({
    queryKey: ['education'],
    queryFn: async () => {
      console.log('Fetching education...');
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .order('start_year', { ascending: false });
      
      if (error) {
        console.error('Error fetching education:', error);
        throw error;
      }
      console.log('Education fetched successfully:', data);
      return data;
    },
  });
};

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      console.log('Fetching projects...');
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('featured', { ascending: false });
      
      if (error) {
        console.error('Error fetching projects:', error);
        throw error;
      }
      console.log('Projects fetched successfully:', data);
      return data;
    },
  });
};

export const useArticles = () => {
  return useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      console.log('Fetching articles...');
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching articles:', error);
        throw error;
      }
      console.log('Articles fetched successfully:', data);
      return data;
    },
  });
};

export const useContactSubmit = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: {
      name: string;
      email: string;
      subject: string;
      message: string;
    }) => {
      console.log('Submitting contact form:', formData);
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([formData])
        .select();
    
      if (error) {
        console.error('Error submitting contact form:', error);
        throw error;
      }
      console.log('Contact form submitted successfully:', data);
      return data;
    },
    onSuccess: () => {
      // Invalidate contact messages query if it exists
      queryClient.invalidateQueries({ queryKey: ['contact_messages'] });
    },
  });

  return {
    submitContactForm: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};

// Hook for article likes
export const useArticleLikes = (articleId: string) => {
  return useQuery({
    queryKey: ['article_likes', articleId],
    queryFn: async () => {
      console.log('Fetching article likes for:', articleId);
      const { data, error } = await supabase
        .from('article_likes')
        .select('*')
        .eq('article_id', articleId);
      
      if (error) {
        console.error('Error fetching article likes:', error);
        throw error;
      }
      console.log('Article likes fetched:', data);
      return data;
    },
  });
};

// Hook for comments
export const useComments = (articleId: string) => {
  return useQuery({
    queryKey: ['comments', articleId],
    queryFn: async () => {
      console.log('Fetching comments for article:', articleId);
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('article_id', articleId)
        .order('created_at', { ascending: true });
      
      if (error) {
        console.error('Error fetching comments:', error);
        throw error;
      }
      console.log('Comments fetched:', data);
      return data;
    },
  });
};

// Hook for conversations (chat)
export const useConversations = () => {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: async () => {
      console.log('Fetching conversations...');
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .order('last_message_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching conversations:', error);
        throw error;
      }
      console.log('Conversations fetched:', data);
      return data;
    },
  });
};

// Hook for chat messages
export const useChatMessages = (conversationId: string) => {
  return useQuery({
    queryKey: ['chat_messages', conversationId],
    queryFn: async () => {
      console.log('Fetching chat messages for conversation:', conversationId);
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });
      
      if (error) {
        console.error('Error fetching chat messages:', error);
        throw error;
      }
      console.log('Chat messages fetched:', data);
      return data;
    },
  });
};

// Mutation hook for creating skills in database
export const useCreateSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (skillData: {
      name: string;
      category: string;
      proficiency_level: number;
      years_experience?: number;
      description?: string;
    }) => {
      console.log('Creating skill:', skillData);
      const { data, error } = await supabase
        .from('skills')
        .insert([skillData])
        .select();
      
      if (error) {
        console.error('Error creating skill:', error);
        throw error;
      }
      console.log('Skill created successfully:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
    },
  });
};

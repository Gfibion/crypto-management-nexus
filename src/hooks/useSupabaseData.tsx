
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('active', true)
        .order('featured', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useSkills = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('proficiency_level', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useEducation = () => {
  return useQuery({
    queryKey: ['education'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .order('start_year', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('featured', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useArticles = () => {
  return useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useContactSubmit = () => {
  const submitContactForm = async (formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([formData]);
    
    if (error) throw error;
    return data;
  };

  return { submitContactForm };
};

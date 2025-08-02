import { supabase } from '@/integrations/supabase/client';
import { businessServices, ictServices } from '@/components/services/serviceData';

export const populateServicesData = async () => {
  try {
    // First, check if services already exist
    const { data: existingServices } = await supabase
      .from('services')
      .select('id')
      .limit(1);

    if (existingServices && existingServices.length > 0) {
      console.log('Services already exist in database');
      return;
    }

    // Prepare services data for database insertion
    const allServicesData = [
      ...businessServices.map(service => ({
        id: service.id,
        title: service.title,
        description: service.description,
        icon: service.icon,
        category: 'Business Strategy & Consulting',
        featured: service.featured || false,
        features: service.features,
        active: true
      })),
      ...ictServices.map(service => ({
        id: service.id,
        title: service.title,
        description: service.description,
        icon: service.icon,
        category: 'Information & Communication Technology',
        featured: service.featured || false,
        features: service.features,
        active: true
      }))
    ];

    // Insert services into database
    const { error } = await supabase
      .from('services')
      .insert(allServicesData);

    if (error) {
      console.error('Error populating services data:', error);
      throw error;
    }

    console.log('Services data populated successfully');
  } catch (error) {
    console.error('Failed to populate services data:', error);
    throw error;
  }
};
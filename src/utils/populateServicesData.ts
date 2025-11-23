import { supabase } from '@/integrations/supabase/client';
import { businessManagementServices, ictTechnologyServices } from '@/components/services/serviceData';
import { allBusinessServices, allIctServices } from '@/components/services/expandedServiceData';

export const populateServicesData = async () => {
  try {
    console.log('Starting to populate services data...');

    // Use only the main serviceData.ts (simpler, more reliable)
    const allServices = [
      ...businessManagementServices,
      ...ictTechnologyServices
    ];

    console.log(`Processing ${allServices.length} services`);

    // Prepare services data for database insertion
    const servicesToInsert = allServices.map(service => ({
      title: service.title,
      description: service.description,
      icon: service.icon || null,
      category: service.category, // Already 'Business Management' or 'ICT & Technology'
      featured: service.featured || false,
      features: service.features || [],
      price_range: service.price_range || null,
      active: true
    }));

    // Delete all existing services first, then insert fresh ones
    // This ensures clean data without duplicates
    const { error: deleteError } = await supabase
      .from('services')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all (this condition is always true)

    if (deleteError) {
      console.warn('Error deleting existing services (may not exist):', deleteError);
      // Continue anyway
    }

    // Insert all services
    const { data: insertedData, error: insertError } = await supabase
      .from('services')
      .insert(servicesToInsert)
      .select();

    if (insertError) {
      console.error('Error inserting services:', insertError);
      throw insertError;
    }

    console.log(`Successfully inserted ${insertedData?.length || 0} services into database`);
    return { 
      success: true, 
      inserted: insertedData?.length || 0, 
      total: allServices.length 
    };
  } catch (error) {
    console.error('Failed to populate services data:', error);
    throw error;
  }
};
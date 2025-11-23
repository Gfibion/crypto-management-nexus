import { supabase } from '@/integrations/supabase/client';
import { businessManagementServices, ictTechnologyServices } from '@/components/services/serviceData';
import { allBusinessServices, allIctServices } from '@/components/services/expandedServiceData';

export const populateServicesData = async () => {
  try {
    console.log('Starting to populate/update services data...');

    // Combine all services from both files
    // Use the main serviceData.ts as primary source, and expandedServiceData.ts for additional services
    const allServices = [
      ...businessManagementServices,
      ...ictTechnologyServices,
      ...allBusinessServices,
      ...allIctServices
    ];

    // Remove duplicates based on id, keeping the first occurrence (from serviceData.ts takes priority)
    const uniqueServices = Array.from(
      new Map(allServices.map(service => [service.id, service])).values()
    );

    console.log(`Found ${uniqueServices.length} unique services to process`);

    // Get existing services from database to match by title
    const { data: existingServices, error: fetchError } = await supabase
      .from('services')
      .select('id, title');

    if (fetchError) {
      console.error('Error fetching existing services:', fetchError);
      throw fetchError;
    }

    const existingTitles = new Set(existingServices?.map(s => s.title.toLowerCase()) || []);
    const existingById = new Map(existingServices?.map(s => [s.title.toLowerCase(), s.id]) || []);

    let insertedCount = 0;
    let updatedCount = 0;

    // Process each service
    for (const service of uniqueServices) {
      // Normalize category to match database expectations
      let category = service.category;
      if (category === 'Business Strategy & Consulting' || 
          category === 'Strategic Management' ||
          category === 'Operations & Leadership' ||
          category === 'Financial Management' ||
          category === 'Business Development' ||
          category === 'Innovation & Entrepreneurship') {
        category = 'Business Management';
      } else if (category === 'Information & Communication Technology' ||
                 category === 'Software Development' ||
                 category === 'System Architecture' ||
                 category === 'Data & Analytics' ||
                 category === 'Infrastructure & Security') {
        category = 'ICT & Technology';
      }

      const serviceData = {
        title: service.title,
        description: service.description,
        icon: service.icon || null,
        category: category,
        featured: service.featured || false,
        features: service.features || [],
        price_range: service.price_range || null,
        active: true
      };

      const titleLower = service.title.toLowerCase();
      
      if (existingTitles.has(titleLower)) {
        // Update existing service
        const existingId = existingById.get(titleLower);
        const { error: updateError } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', existingId);

        if (updateError) {
          console.error(`Error updating service "${service.title}":`, updateError);
        } else {
          updatedCount++;
        }
      } else {
        // Insert new service
        const { error: insertError } = await supabase
          .from('services')
          .insert([serviceData]);

        if (insertError) {
          console.error(`Error inserting service "${service.title}":`, insertError);
        } else {
          insertedCount++;
        }
      }
    }

    console.log(`Successfully processed services: ${insertedCount} inserted, ${updatedCount} updated`);
    return { success: true, inserted: insertedCount, updated: updatedCount, total: uniqueServices.length };
  } catch (error) {
    console.error('Failed to populate services data:', error);
    throw error;
  }
};
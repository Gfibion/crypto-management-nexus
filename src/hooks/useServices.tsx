import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { businessManagementServices, ictTechnologyServices } from "@/components/services/serviceData";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  featured?: boolean;
  price_range?: string;
  features: string[];
}

interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

const transformDbService = (service: any, categoryName: string): Service => ({
  id: service.id,
  title: service.title,
  description: service.description,
  icon: service.icon || 'briefcase',
  category: categoryName,
  featured: service.featured || false,
  price_range: service.price_range || undefined,
  features: service.tags || []
});

export const useServices = () => {
  const { data: categories } = useQuery({
    queryKey: ['service-categories'],
    queryFn: async (): Promise<ServiceCategory[]> => {
      const { data, error } = await supabase
        .from('service_categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data || [];
    }
  });

  const { data: dbServices, isLoading, error } = useQuery({
    queryKey: ['services-public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*, service_categories(name)')
        .eq('active', true)
        .order('featured', { ascending: false })
        .order('title');
      
      if (error) throw error;
      return data || [];
    }
  });

  // Transform DB services and group by category
  const transformedServices = dbServices?.map(service => 
    transformDbService(
      service, 
      service.service_categories?.name || 'General'
    )
  ) || [];

  // Check if we have data from DB
  const hasDbData = transformedServices.length > 0;

  // Separate by category - use DB data if available, fallback to hardcoded
  const businessServices: Service[] = hasDbData
    ? transformedServices.filter(s => 
        s.category.toLowerCase().includes('business') || 
        s.category.toLowerCase().includes('management')
      )
    : businessManagementServices;

  const ictServices: Service[] = hasDbData
    ? transformedServices.filter(s => 
        s.category.toLowerCase().includes('ict') || 
        s.category.toLowerCase().includes('technology')
      )
    : ictTechnologyServices;

  return {
    businessServices,
    ictServices,
    allServices: [...businessServices, ...ictServices],
    categories: categories || [],
    isLoading,
    error,
    isUsingFallback: !hasDbData
  };
};

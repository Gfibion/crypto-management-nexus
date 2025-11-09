import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  // Fetch approved testimonials from database
  const { data: testimonialsData = [] } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('status', 'approved')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(6);
      
      if (error) throw error;

      // Fetch user profiles
      const userIds = [...new Set(data.map(t => t.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', userIds);

      // Combine data
      return data.map(testimonial => ({
        ...testimonial,
        user: profiles?.find(p => p.id === testimonial.user_id),
      }));
    },
  });

  const testimonials = testimonialsData;

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-white">Client Testimonials</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="bg-slate-800/60 border-purple-800/40 hover:border-purple-600/60 transition-all duration-300 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="text-4xl text-purple-400 mb-4 font-serif">"</div>
              <p className="text-gray-300 mb-5 italic leading-relaxed">{testimonial.message}</p>
              
              {testimonial.rating && (
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              )}

              <div className="border-t border-purple-800/40 pt-4">
                <p className="text-white font-semibold text-sm">{testimonial.user?.full_name || 'Anonymous'}</p>
                <p className="text-purple-300 text-sm">{testimonial.role}</p>
                {testimonial.company && (
                  <p className="text-gray-400 text-sm">{testimonial.company}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;

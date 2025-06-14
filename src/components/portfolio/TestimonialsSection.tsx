
import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "./portfolioData";

const TestimonialsSection = () => {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-white">Client Testimonials</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-slate-800/60 border-purple-800/40 hover:border-purple-600/60 transition-all duration-300 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="text-4xl text-purple-400 mb-4 font-serif">"</div>
              <p className="text-gray-300 mb-5 italic leading-relaxed">{testimonial.quote}</p>
              <div className="border-t border-purple-800/40 pt-4">
                <p className="text-white font-semibold text-sm">{testimonial.author}</p>
                <p className="text-purple-300 text-sm">{testimonial.role}</p>
                <p className="text-gray-400 text-sm">{testimonial.company}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;

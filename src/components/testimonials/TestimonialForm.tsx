import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Star, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const TestimonialForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    rating: 5,
    message: '',
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit a testimonial.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.role || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from('testimonials')
        .insert({
          message: formData.message,
          rating: formData.rating,
          company: formData.company || null,
          role: formData.role,
          user_id: user.id,
          status: 'pending',
        });

      if (error) throw error;

      toast({
        title: "Testimonial Submitted",
        description: "Thank you for your feedback! Your testimonial is under review."
      });

      // Reset form
      setFormData({
        company: '',
        role: '',
        rating: 5,
        message: '',
      });

    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit testimonial. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = ({ rating, onRatingChange }: { rating: number; onRatingChange: (rating: number) => void }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className={`p-1 transition-colors ${
              star <= rating ? 'text-yellow-400' : 'text-gray-400'
            } hover:text-yellow-300`}
          >
            <Star className="h-5 w-5 fill-current" />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-300">({rating}/5)</span>
      </div>
    );
  };

  return (
    <Card className="bg-slate-800/50 border-purple-800/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Share Your Experience
        </CardTitle>
        <p className="text-gray-300 text-sm">
          Help us improve by sharing your feedback about our services and website
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="role" className="text-gray-300">
              Your Role/Position *
            </Label>
            <Input
              id="role"
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              placeholder="e.g., CEO, Business Manager, Developer"
              className="bg-slate-700 border-purple-600/30 text-white"
              required
            />
          </div>

          <div>
            <Label htmlFor="company" className="text-gray-300">
              Company/Organization (Optional)
            </Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              placeholder="Your company or organization name"
              className="bg-slate-700 border-purple-600/30 text-white"
            />
          </div>

          <div>
            <Label className="text-gray-300">Rating *</Label>
            <StarRating 
              rating={formData.rating} 
              onRatingChange={(rating) => handleInputChange('rating', rating)} 
            />
          </div>

          <div>
            <Label htmlFor="message" className="text-gray-300">
              Your Testimonial *
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Share your experience working with us, the results you achieved, and what you valued most..."
              rows={5}
              className="bg-slate-700 border-purple-600/30 text-white"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Testimonial'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TestimonialForm;
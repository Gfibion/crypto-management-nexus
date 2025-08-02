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
    category: '',
    rating: 5,
    title: '',
    message: '',
    suggestions: ''
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

    if (!formData.category || !formData.title || !formData.message) {
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
        .from('contact_messages')
        .insert({
          name: user.email?.split('@')[0] || 'Anonymous',
          email: user.email || '',
          subject: `${formData.category} - ${formData.title} (Rating: ${formData.rating}/5)`,
          message: `${formData.message}\n\n--- Additional Feedback ---\nSuggestions: ${formData.suggestions || 'None provided'}`,
          type: 'testimonial'
        });

      if (error) throw error;

      toast({
        title: "Testimonial Submitted",
        description: "Thank you for your feedback! Your testimonial is under review."
      });

      // Reset form
      setFormData({
        category: '',
        rating: 5,
        title: '',
        message: '',
        suggestions: ''
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
            <Label htmlFor="category" className="text-gray-300">
              What would you like to review? *
            </Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger className="bg-slate-700 border-purple-600/30 text-white">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="website">Website & User Experience</SelectItem>
                <SelectItem value="services">Services Quality</SelectItem>
                <SelectItem value="skills">Skills & Expertise</SelectItem>
                <SelectItem value="communication">Communication & Support</SelectItem>
                <SelectItem value="overall">Overall Experience</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-gray-300">Rating *</Label>
            <StarRating 
              rating={formData.rating} 
              onRatingChange={(rating) => handleInputChange('rating', rating)} 
            />
          </div>

          <div>
            <Label htmlFor="title" className="text-gray-300">
              Review Title *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Summarize your experience in a few words"
              className="bg-slate-700 border-purple-600/30 text-white"
              required
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
              placeholder="Share your detailed experience, what you liked, and how our services helped you..."
              rows={4}
              className="bg-slate-700 border-purple-600/30 text-white"
              required
            />
          </div>

          <div>
            <Label htmlFor="suggestions" className="text-gray-300">
              Suggestions for Improvement (Optional)
            </Label>
            <Textarea
              id="suggestions"
              value={formData.suggestions}
              onChange={(e) => handleInputChange('suggestions', e.target.value)}
              placeholder="Any suggestions on how we can improve our services or website?"
              rows={3}
              className="bg-slate-700 border-purple-600/30 text-white"
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
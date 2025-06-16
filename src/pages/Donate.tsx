
import React, { useEffect } from 'react';
import DonationHeader from '@/components/donate/DonationHeader';
import DonationForm from '@/components/donate/DonationForm';
import DonationInfo from '@/components/donate/DonationInfo';
import { useToast } from '@/hooks/use-toast';

const Donate = () => {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "Feature Under Development",
      description: "Please note that the donation functionality is currently in development mode. This is a demonstration of the interface and features that will be available once fully implemented.",
      duration: 8000,
    });
  }, [toast]);

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <DonationHeader />
        
        <div className="grid md:grid-cols-2 gap-8">
          <DonationForm />
          <DonationInfo />
        </div>
      </div>
    </div>
  );
};

export default Donate;

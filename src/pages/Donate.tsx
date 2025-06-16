
import React from 'react';
import DonationHeader from '@/components/donate/DonationHeader';
import DonationForm from '@/components/donate/DonationForm';
import DonationInfo from '@/components/donate/DonationInfo';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const Donate = () => {
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Alert className="mb-8 bg-blue-900/50 border-blue-500/50 text-blue-100">
          <AlertTriangle className="h-6 w-6 text-blue-400" />
          <AlertTitle className="text-xl font-semibold text-blue-100">Feature Under Development</AlertTitle>
          <AlertDescription className="text-blue-200 text-base mt-2">
            Please note that the donation functionality is currently in development mode. This is a demonstration of the interface and features that will be available once fully implemented. All payment processing is simulated for demonstration purposes only.
          </AlertDescription>
        </Alert>
        
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


import React from 'react';
import DonationHeader from '@/components/donate/DonationHeader';
import DemoNotice from '@/components/donate/DemoNotice';
import DonationForm from '@/components/donate/DonationForm';
import DonationInfo from '@/components/donate/DonationInfo';

const Donate = () => {
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <DonationHeader />
        <DemoNotice />
        
        <div className="grid md:grid-cols-2 gap-8">
          <DonationForm />
          <DonationInfo />
        </div>
      </div>
    </div>
  );
};

export default Donate;

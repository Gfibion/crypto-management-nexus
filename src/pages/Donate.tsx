
import React from 'react';
import DonationHeader from '@/components/donate/DonationHeader';
import DonationForm from '@/components/donate/DonationForm';
import DonationInfo from '@/components/donate/DonationInfo';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import SEOHead from '@/components/SEOHead';

const Donate = () => {
  return (
    <PageLayout>
      <SEOHead 
        title="Support Gfibion Joseph Mutua | Donate to Business & Technology Innovation"
        description="Support the work of Gfibion Joseph Mutua in business management and ICT consulting. Your donation helps fund innovative projects, educational content, and community development initiatives."
        keywords="donate, support, Gfibion Joseph Mutua, business innovation, technology development, community support, ICT projects, Kenya entrepreneur support"
        canonical="https://josephmgfibion.org/donate"
        ogImage="https://josephmgfibion.org/og-default.png"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Donate to Gfibion Joseph Mutua",
          "description": "Support business and technology innovation initiatives",
          "url": "https://josephmgfibion.org/donate",
          "isPartOf": {
            "@type": "WebSite",
            "name": "Gfibion Joseph Mutua",
            "url": "https://josephmgfibion.org"
          }
        }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Alert className="mb-8 bg-gradient-to-r from-cyan-900/50 to-blue-900/50 border-cyan-500/50 text-cyan-100 backdrop-blur-sm animate-scale-in shadow-lg">
          <Info className="h-6 w-6 text-cyan-400" />
          <AlertTitle className="text-xl font-semibold text-cyan-100 animate-slide-in">Secure Payments via Paystack</AlertTitle>
          <AlertDescription className="text-cyan-200 text-base mt-2 animate-fade-in stagger-1">
            Your donation is processed securely through Paystack, a trusted payment gateway. All transactions are encrypted and verified for your safety.
          </AlertDescription>
        </Alert>
        
        <div className="animate-fade-in">
          <DonationHeader />
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 animate-scale-in stagger-1">
          <DonationForm />
          <DonationInfo />
        </div>
      </div>
    </PageLayout>
  );
};

export default Donate;

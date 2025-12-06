
import React from 'react';
import DonationHeader from '@/components/donate/DonationHeader';
import DonationForm from '@/components/donate/DonationForm';
import DonationInfo from '@/components/donate/DonationInfo';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
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
        <Alert className="mb-8 bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border-blue-500/50 text-blue-100 backdrop-blur-sm animate-scale-in shadow-lg">
          <AlertTriangle className="h-6 w-6 text-blue-400 animate-pulse" />
          <AlertTitle className="text-xl font-semibold text-blue-100 animate-slide-in">Feature Under Development</AlertTitle>
          <AlertDescription className="text-blue-200 text-base mt-2 animate-fade-in stagger-1">
            Please note that the donation functionality is currently in development mode. This is a demonstration of the interface and features that will be available once fully implemented. All payment processing is simulated for demonstration purposes only.
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

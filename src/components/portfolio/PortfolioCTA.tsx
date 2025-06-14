
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { generateMailtoLink } from "@/utils/emailTemplates";

const PortfolioCTA = () => {
  const handleScheduleConsultation = () => {
    const mailtoLink = generateMailtoLink('Portfolio Consultation', {
      name: '[Your Name]',
      company: '[Your Company]'
    });
    window.open(mailtoLink, '_blank');
  };

  const handleDownloadPortfolio = () => {
    // For now, open email to request portfolio PDF
    const subject = 'Portfolio PDF Request';
    const body = `Dear Gfibion Joseph Mutua,

I would like to request a copy of your complete portfolio PDF for review.

Please send the portfolio document to my email address at your earliest convenience.

Thank you for your time.

Best regards,
[Your Name]
[Your Company]
[Your Email Address]`;
    
    const mailtoLink = `mailto:gfibiongenesis@proton.me?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
  };

  return (
    <Card className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border-purple-600/40 backdrop-blur-sm shadow-2xl">
      <CardContent className="p-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          Let's discuss how Gfibion Joseph Mutua can bring similar success to your organization
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 font-medium px-8"
            onClick={handleScheduleConsultation}
          >
            Schedule Consultation
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-purple-400/60 text-purple-400 hover:bg-purple-400 hover:text-white font-medium px-8"
            onClick={handleDownloadPortfolio}
          >
            Download Portfolio PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioCTA;

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SocialShare from './SocialShare';

interface ReferralShareProps {
  className?: string;
}

const ReferralShare: React.FC<ReferralShareProps> = ({ className = "" }) => {
  const { toast } = useToast();
  const referralUrl = 'https://josephmgfibion.org';
  const referralMessage = 'Check out Gfibion Joseph Mutua - Professional Business Manager & ICT Consultant. Expert in strategic management, digital transformation, and innovative business solutions!';

  const handleCopyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      toast({
        title: "Referral link copied!",
        description: "Share it with your network",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className={`bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-600/30 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <UserPlus className="h-5 w-5" />
          Share & Invite
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300">
          Know someone who could benefit from professional business consulting or ICT services? Share this page with your network!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={handleCopyReferralLink}
            variant="outline"
            className="flex-1 border-purple-400/30 text-purple-300 hover:bg-purple-400/20"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Copy Referral Link
          </Button>
          
          <SocialShare
            url={referralUrl}
            title="Gfibion Joseph Mutua - Professional Business Consultant"
            description={referralMessage}
            hashtags={['BusinessConsulting', 'ICTServices', 'DigitalTransformation', 'StrategicManagement']}
            variant="default"
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
          />
        </div>

        <div className="text-sm text-gray-400 text-center pt-2">
          Help grow our professional network by referring clients and connections
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralShare;

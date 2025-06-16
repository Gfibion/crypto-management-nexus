
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Calendar } from "lucide-react";

const ActionCards = () => {
  const handleDownloadResume = () => {
    window.open('mailto:contact@yoursite.com?subject=Resume Request', '_blank');
  };

  const handleScheduleAssessment = () => {
    window.open('mailto:contact@yoursite.com?subject=Skills Assessment Request', '_blank');
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 mb-16">
      <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-600/30">
        <CardContent className="p-8 text-center">
          <Download className="h-12 w-12 text-blue-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-4">Professional Resume</h3>
          <p className="text-gray-300 mb-6">
            Download my detailed resume with complete work history and achievements
          </p>
          <Button 
            onClick={handleDownloadResume}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Resume
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-600/30">
        <CardContent className="p-8 text-center">
          <Calendar className="h-12 w-12 text-purple-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-4">Skills Assessment</h3>
          <p className="text-gray-300 mb-6">
            Schedule a consultation to assess how my skills align with your needs
          </p>
          <Button 
            onClick={handleScheduleAssessment}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Assessment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActionCards;

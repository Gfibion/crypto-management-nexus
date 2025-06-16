
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SkillsCTA = () => {
  return (
    <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-600/30">
      <CardContent className="p-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Let's Work Together</h2>
        <p className="text-xl text-gray-300 mb-8">
          Ready to leverage these comprehensive business and technology capabilities for your organization's success?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/services">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 w-full sm:w-auto">
              View Services
            </Button>
          </Link>
          <Link to="/portfolio">
            <Button variant="outline" size="lg" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white w-full sm:w-auto">
              See Case Studies
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsCTA;

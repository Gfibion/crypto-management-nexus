
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const DemoNotice = () => {
  return (
    <Alert className="mb-8 bg-yellow-900/20 border-yellow-600/30">
      <AlertTriangle className="h-4 w-4 text-yellow-500" />
      <AlertDescription className="text-yellow-200">
        <strong>Demo Mode:</strong> This is currently a demonstration. For real MPesa integration, 
        the system needs to be connected to MPesa API with proper credentials and backend processing.
      </AlertDescription>
    </Alert>
  );
};

export default DemoNotice;


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone } from "lucide-react";

const DonationInfo = () => {
  return (
    <Card className="bg-slate-800/50 border-blue-800/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Phone className="h-6 w-6 mr-2 text-blue-500" />
          Donation Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-white font-semibold mb-2">How it works:</h3>
          <ol className="text-gray-300 space-y-2 list-decimal list-inside">
            <li>Enter your desired donation amount</li>
            <li>Provide your MPesa phone number</li>
            <li>Click "Donate via MPesa"</li>
            <li>Check your phone for the MPesa payment prompt</li>
            <li>Enter your MPesa PIN to complete the donation</li>
          </ol>
        </div>

        <div className="bg-slate-700/50 p-4 rounded-lg">
          <h4 className="text-white font-semibold mb-2">Recipient Details:</h4>
          <p className="text-gray-300">
            <strong>Name:</strong> Gfibion Joseph Mutua<br />
            <strong>Phone:</strong> +254768974474<br />
            <strong>Service:</strong> MPesa
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">Your support helps with:</h4>
          <ul className="text-gray-300 space-y-1 list-disc list-inside">
            <li>Continuing professional development</li>
            <li>Maintaining and improving services</li>
            <li>Creating valuable content and resources</li>
            <li>Supporting community initiatives</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">For Real MPesa Integration:</h4>
          <p className="text-gray-300 text-sm">
            To enable actual MPesa payments, this system would need:
          </p>
          <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside mt-2">
            <li>MPesa API credentials from Safaricom</li>
            <li>Backend server for secure API calls</li>
            <li>Proper webhook handling for payment confirmations</li>
          </ul>
        </div>

        <div className="text-center p-4 bg-purple-900/30 rounded-lg">
          <p className="text-purple-300 font-medium">
            Thank you for your generosity! 🙏
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DonationInfo;

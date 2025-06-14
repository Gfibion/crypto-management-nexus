
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Phone, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Donate = () => {
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleDonate = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid donation amount",
        variant: "destructive"
      });
      return;
    }

    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid MPesa phone number",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Format phone number to international format
      let formattedPhone = phoneNumber;
      if (phoneNumber.startsWith('0')) {
        formattedPhone = '+254' + phoneNumber.substring(1);
      } else if (!phoneNumber.startsWith('+254')) {
        formattedPhone = '+254' + phoneNumber;
      }

      // Simulate MPesa API call
      // In a real implementation, you would call the MPesa API here
      await simulateMpesaPayment(formattedPhone, parseFloat(amount));

      toast({
        title: "Payment Initiated",
        description: `MPesa payment request sent to ${formattedPhone}. Please enter your MPesa PIN to complete the donation of KES ${amount}`,
      });

      // Reset form
      setAmount('');
      setPhoneNumber('');
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your donation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const simulateMpesaPayment = async (phone: string, amount: number) => {
    // This simulates the MPesa API call
    // In production, you would integrate with the actual MPesa API
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`MPesa payment initiated: ${phone} - KES ${amount} to +254768974474`);
        resolve(true);
      }, 2000);
    });
  };

  const suggestedAmounts = [100, 500, 1000, 2000, 5000];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Heart className="h-16 w-16 text-red-500" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Support My Work</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your donations help me continue providing quality business consulting and technology solutions. 
            Every contribution, no matter the size, is greatly appreciated.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Donation Form */}
          <Card className="bg-slate-800/50 border-purple-800/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <DollarSign className="h-6 w-6 mr-2 text-green-500" />
                Make a Donation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Suggested Amounts */}
              <div>
                <Label className="text-gray-300 mb-3 block">Quick Select (KES)</Label>
                <div className="grid grid-cols-3 gap-2">
                  {suggestedAmounts.map((suggestedAmount) => (
                    <Button
                      key={suggestedAmount}
                      variant="outline"
                      size="sm"
                      onClick={() => setAmount(suggestedAmount.toString())}
                      className="border-purple-400/50 text-purple-400 hover:bg-purple-400 hover:text-white"
                    >
                      {suggestedAmount}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div>
                <Label htmlFor="amount" className="text-gray-300">
                  Donation Amount (KES)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-slate-700/50 border-gray-600 text-white"
                  min="1"
                />
              </div>

              {/* Phone Number */}
              <div>
                <Label htmlFor="phone" className="text-gray-300">
                  Your MPesa Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="0712345678 or +254712345678"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="bg-slate-700/50 border-gray-600 text-white"
                />
                <p className="text-sm text-gray-400 mt-1">
                  This is where you'll receive the MPesa payment prompt
                </p>
              </div>

              {/* Donate Button */}
              <Button
                onClick={handleDonate}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                size="lg"
              >
                {isProcessing ? (
                  "Processing..."
                ) : (
                  <>
                    <Heart className="h-5 w-5 mr-2" />
                    Donate via MPesa
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Information Card */}
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

              <div className="text-center p-4 bg-purple-900/30 rounded-lg">
                <p className="text-purple-300 font-medium">
                  Thank you for your generosity! 🙏
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Donate;

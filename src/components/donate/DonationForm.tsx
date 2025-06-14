
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DonationForm = () => {
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

      // Simulate MPesa API call with more realistic feedback
      await simulateMpesaPayment(formattedPhone, parseFloat(amount));

      toast({
        title: "Payment Request Sent",
        description: `Please check your phone ${formattedPhone} for the MPesa payment prompt and enter your PIN to complete the donation of KES ${amount}`,
      });

      // Reset form after successful initiation
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
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`MPesa payment initiated: ${phone} - KES ${amount} to +254768974474`);
        // Simulate success most of the time
        if (Math.random() > 0.1) {
          resolve(true);
        } else {
          reject(new Error('Payment failed'));
        }
      }, 2000);
    });
  };

  const suggestedAmounts = [50, 100, 500, 1000, 2000, 5000];

  return (
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
            "Sending Payment Request..."
          ) : (
            <>
              <Heart className="h-5 w-5 mr-2" />
              Donate via MPesa
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DonationForm;

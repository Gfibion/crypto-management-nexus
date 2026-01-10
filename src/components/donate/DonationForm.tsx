import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { CreditCard, Heart, Loader2, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Paystack public key
const PAYSTACK_PUBLIC_KEY = 'pk_live_bcde4569763707624c881741b5b2dc7d665da6cf';

declare global {
  interface Window {
    PaystackPop: {
      setup: (config: PaystackConfig) => { openIframe: () => void };
    };
  }
}

interface PaystackConfig {
  key: string;
  email: string;
  amount: number;
  currency: string;
  ref: string;
  callback: (response: { reference: string }) => void;
  onClose: () => void;
  metadata?: {
    custom_fields: Array<{
      display_name: string;
      variable_name: string;
      value: string;
    }>;
  };
}

const DonationForm = () => {
  const [amount, setAmount] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { toast } = useToast();

  const suggestedAmounts = [500, 1000, 2500, 5000, 10000];

  const generateReference = () => {
    return `donate_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  };

  const verifyPayment = async (reference: string) => {
    setIsVerifying(true);
    try {
      const { data, error } = await supabase.functions.invoke('paystack-verify', {
        body: { reference },
      });

      if (error) throw error;

      if (data.success) {
        setPaymentSuccess(true);
        toast({
          title: "Thank You! 🎉",
          description: `Your donation of KES ${data.data.amount.toLocaleString()} has been received successfully!`,
        });
      } else {
        toast({
          title: "Verification Failed",
          description: data.message || "Could not verify your payment. Please contact support.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast({
        title: "Verification Error",
        description: "Could not verify payment. Please contact support with your reference.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDonate = () => {
    const donationAmount = parseFloat(amount);
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Email Required",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (isNaN(donationAmount) || donationAmount < 100) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a minimum donation of KES 100.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Load Paystack script if not already loaded
    if (!window.PaystackPop) {
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.onload = () => initializePayment(donationAmount);
      script.onerror = () => {
        setIsProcessing(false);
        toast({
          title: "Error",
          description: "Failed to load payment gateway. Please try again.",
          variant: "destructive",
        });
      };
      document.body.appendChild(script);
    } else {
      initializePayment(donationAmount);
    }
  };

  const initializePayment = (donationAmount: number) => {
    const reference = generateReference();
    
    try {
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: email,
        amount: donationAmount * 100, // Convert to kobo (smallest currency unit)
        currency: 'KES',
        ref: reference,
        metadata: {
          custom_fields: [
            {
              display_name: "Donor Name",
              variable_name: "donor_name",
              value: name || 'Anonymous',
            },
          ],
        },
        callback: (response) => {
          setIsProcessing(false);
          verifyPayment(response.reference);
        },
        onClose: () => {
          setIsProcessing(false);
          toast({
            title: "Payment Cancelled",
            description: "You cancelled the payment. Feel free to try again!",
          });
        },
      });

      handler.openIframe();
    } catch (error) {
      console.error('Paystack initialization error:', error);
      setIsProcessing(false);
      toast({
        title: "Payment Error",
        description: "Could not initialize payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (paymentSuccess) {
    return (
      <Card className="bg-gradient-to-br from-green-900/50 to-cyan-900/30 border-green-500/50 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
          <p className="text-green-200 mb-6">
            Your generous donation has been received successfully. 
            Your support means the world to us!
          </p>
          <Button 
            onClick={() => {
              setPaymentSuccess(false);
              setAmount('');
              setEmail('');
              setName('');
            }}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
          >
            <Heart className="w-4 h-4 mr-2" />
            Make Another Donation
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-gray-900/50 to-blue-900/30 border-blue-500/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-cyan-400" />
          Make a Donation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Suggested Amounts */}
        <div>
          <Label className="text-gray-300 mb-3 block">Quick Select Amount (KES)</Label>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {suggestedAmounts.map((suggestedAmount) => (
              <Button
                key={suggestedAmount}
                type="button"
                variant={amount === suggestedAmount.toString() ? "default" : "outline"}
                className={`${
                  amount === suggestedAmount.toString()
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0'
                    : 'border-blue-500/50 text-blue-300 hover:bg-blue-900/50 hover:text-white'
                }`}
                onClick={() => setAmount(suggestedAmount.toString())}
              >
                {suggestedAmount.toLocaleString()}
              </Button>
            ))}
          </div>
        </div>

        {/* Custom Amount */}
        <div>
          <Label htmlFor="amount" className="text-gray-300">
            Custom Amount (KES)
          </Label>
          <Input
            id="amount"
            type="number"
            placeholder="Enter amount (min 100)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 mt-2"
            min="100"
          />
        </div>

        {/* Donor Name */}
        <div>
          <Label htmlFor="name" className="text-gray-300">
            Your Name (Optional)
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 mt-2"
          />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="text-gray-300">
            Email Address <span className="text-red-400">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 mt-2"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Required for payment receipt</p>
        </div>

        {/* Donate Button */}
        <Button
          onClick={handleDonate}
          disabled={isProcessing || isVerifying}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-6 text-lg shadow-lg shadow-cyan-500/25 transition-all duration-300"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Opening Payment...
            </>
          ) : isVerifying ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Verifying Payment...
            </>
          ) : (
            <>
              <Heart className="w-5 h-5 mr-2" />
              Donate via Paystack
            </>
          )}
        </Button>

        {/* Security Note */}
        <p className="text-center text-xs text-gray-500">
          🔒 Secure payment powered by Paystack
        </p>
      </CardContent>
    </Card>
  );
};

export default DonationForm;

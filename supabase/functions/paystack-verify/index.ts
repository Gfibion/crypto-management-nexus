import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { reference } = await req.json();

    if (!reference) {
      return new Response(
        JSON.stringify({ success: false, message: 'Transaction reference is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const paystackSecretKey = Deno.env.get('PAYSTACK_SECRET_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!paystackSecretKey) {
      console.error('PAYSTACK_SECRET_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, message: 'Payment configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client with service role key
    const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

    // Verify transaction with Paystack
    const verifyResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${paystackSecretKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const verifyData = await verifyResponse.json();

    console.log('Paystack verification response:', JSON.stringify(verifyData));

    if (verifyData.status && verifyData.data.status === 'success') {
      // Transaction was successful
      const { amount, currency, customer, paid_at, channel, metadata } = verifyData.data;
      
      // Extract donor name from metadata
      const donorName = metadata?.custom_fields?.find(
        (f: { variable_name: string }) => f.variable_name === 'donor_name'
      )?.value || null;

      // Save donation to database
      const { error: insertError } = await supabase
        .from('donations')
        .insert({
          email: customer.email,
          donor_name: donorName,
          amount: amount / 100, // Convert from kobo to main currency
          currency,
          reference,
          channel,
          status: 'success',
          paid_at,
        });

      if (insertError) {
        console.error('Error saving donation:', insertError);
        // Don't fail the response, donation was successful even if DB insert failed
      }
      
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Payment verified successfully',
          data: {
            amount: amount / 100,
            currency,
            email: customer.email,
            paidAt: paid_at,
            channel,
            reference,
          },
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: verifyData.message || 'Payment verification failed',
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Paystack verification error:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'An error occurred during verification' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

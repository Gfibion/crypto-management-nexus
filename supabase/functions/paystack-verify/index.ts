import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const resend = new Resend(RESEND_API_KEY);

async function sendAdminNotification(donation: {
  donorName: string;
  email: string;
  amount: number;
  currency: string;
  reference: string;
  channel: string;
  paidAt: string;
}) {
  if (!RESEND_API_KEY) {
    console.log("RESEND_API_KEY not configured, skipping admin email");
    return;
  }

  const formattedAmount = `${donation.currency} ${donation.amount.toLocaleString()}`;
  const formattedDate = new Date(donation.paidAt).toLocaleString('en-KE', {
    dateStyle: 'full',
    timeStyle: 'short',
  });

  try {
    await resend.emails.send({
      from: "Gfibion Genesis <onboarding@resend.dev>",
      to: ["fibionjoseph@gmail.com"],
      subject: `🎉 New Donation Received: ${formattedAmount}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0f172a; color: #e2e8f0; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); padding: 30px; border-radius: 16px 16px 0 0; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 28px; }
            .header .emoji { font-size: 48px; margin-bottom: 10px; }
            .content { background: #1e293b; padding: 30px; border-radius: 0 0 16px 16px; }
            .amount { font-size: 36px; font-weight: bold; color: #06b6d4; text-align: center; margin: 20px 0; }
            .details { background: #0f172a; border-radius: 12px; padding: 20px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #334155; }
            .detail-row:last-child { border-bottom: none; }
            .label { color: #94a3b8; }
            .value { color: #f1f5f9; font-weight: 500; }
            .footer { text-align: center; padding: 20px; color: #64748b; font-size: 14px; }
            .cta { display: inline-block; background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="emoji">🎉</div>
              <h1>New Donation Received!</h1>
            </div>
            <div class="content">
              <div class="amount">${formattedAmount}</div>
              <div class="details">
                <div class="detail-row">
                  <span class="label">Donor Name</span>
                  <span class="value">${donation.donorName}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Email</span>
                  <span class="value">${donation.email}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Payment Method</span>
                  <span class="value">${donation.channel.toUpperCase()}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Reference</span>
                  <span class="value">${donation.reference}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Date & Time</span>
                  <span class="value">${formattedDate}</span>
                </div>
              </div>
              <div style="text-align: center;">
                <a href="https://josephmgfibion.org/admin" class="cta">View in Admin Panel</a>
              </div>
            </div>
            <div class="footer">
              <p>This is an automated notification from Gfibion Genesis</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });
    console.log("Admin notification email sent");
  } catch (error) {
    console.error("Failed to send admin notification:", error);
  }
}

async function sendDonorThankYouEmail(donation: {
  donorName: string;
  email: string;
  amount: number;
  currency: string;
  reference: string;
  channel: string;
  paidAt: string;
}) {
  if (!RESEND_API_KEY) {
    console.log("RESEND_API_KEY not configured, skipping donor thank-you email");
    return;
  }

  const formattedAmount = `${donation.currency} ${donation.amount.toLocaleString()}`;
  const formattedDate = new Date(donation.paidAt).toLocaleString('en-KE', {
    dateStyle: 'full',
    timeStyle: 'short',
  });
  const displayName = donation.donorName || 'Generous Donor';

  try {
    await resend.emails.send({
      from: "Gfibion Genesis <onboarding@resend.dev>",
      to: [donation.email],
      subject: `Thank You for Your Generous Donation! 💙`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8fafc; color: #1e293b; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); padding: 40px 30px; border-radius: 16px 16px 0 0; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 28px; }
            .header .emoji { font-size: 64px; margin-bottom: 15px; }
            .header p { color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px; }
            .content { background: white; padding: 40px 30px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
            .greeting { font-size: 20px; color: #1e293b; margin-bottom: 20px; }
            .message { color: #475569; line-height: 1.7; margin-bottom: 30px; }
            .receipt { background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 12px; padding: 25px; margin: 25px 0; border-left: 4px solid #06b6d4; }
            .receipt-title { font-size: 14px; color: #0891b2; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px; font-weight: 600; }
            .receipt-amount { font-size: 32px; font-weight: bold; color: #0e7490; margin-bottom: 20px; }
            .receipt-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #bae6fd; }
            .receipt-row:last-child { border-bottom: none; }
            .receipt-label { color: #64748b; font-size: 14px; }
            .receipt-value { color: #1e293b; font-weight: 500; font-size: 14px; }
            .impact { background: #fef3c7; border-radius: 12px; padding: 20px; margin: 25px 0; text-align: center; }
            .impact-title { color: #92400e; font-weight: 600; margin-bottom: 10px; }
            .impact-text { color: #a16207; font-size: 14px; }
            .social { text-align: center; margin: 30px 0; }
            .social p { color: #64748b; margin-bottom: 15px; }
            .cta { display: inline-block; background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; }
            .footer { text-align: center; padding: 30px 20px; color: #94a3b8; font-size: 13px; }
            .footer a { color: #06b6d4; text-decoration: none; }
            .heart { color: #ef4444; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="emoji">💙</div>
              <h1>Thank You!</h1>
              <p>Your generosity makes a difference</p>
            </div>
            <div class="content">
              <p class="greeting">Dear ${displayName},</p>
              <p class="message">
                We are deeply grateful for your generous donation. Your support means the world to us and helps fuel our mission to deliver innovative technology solutions and empower businesses across Africa.
              </p>
              <p class="message">
                Every contribution, no matter the size, brings us one step closer to achieving our goals. Thank you for believing in our vision and being part of our journey.
              </p>
              
              <div class="receipt">
                <div class="receipt-title">📋 Donation Receipt</div>
                <div class="receipt-amount">${formattedAmount}</div>
                <div class="receipt-row">
                  <span class="receipt-label">Reference Number</span>
                  <span class="receipt-value">${donation.reference}</span>
                </div>
                <div class="receipt-row">
                  <span class="receipt-label">Payment Method</span>
                  <span class="receipt-value">${donation.channel.toUpperCase()}</span>
                </div>
                <div class="receipt-row">
                  <span class="receipt-label">Date</span>
                  <span class="receipt-value">${formattedDate}</span>
                </div>
                <div class="receipt-row">
                  <span class="receipt-label">Status</span>
                  <span class="receipt-value">✅ Successful</span>
                </div>
              </div>

              <div class="impact">
                <div class="impact-title">🌟 Your Impact</div>
                <p class="impact-text">Your donation directly supports innovation, education, and technological advancement in our community.</p>
              </div>

              <div class="social">
                <p>Stay connected with us!</p>
                <a href="https://josephmgfibion.org" class="cta">Visit Our Website</a>
              </div>
            </div>
            <div class="footer">
              <p>With heartfelt gratitude <span class="heart">❤️</span></p>
              <p><strong>Joseph M. Gfibion</strong><br>Gfibion Genesis</p>
              <p style="margin-top: 20px;">
                <a href="https://josephmgfibion.org">josephmgfibion.org</a>
              </p>
              <p style="margin-top: 15px; font-size: 11px; color: #cbd5e1;">
                This email serves as your official donation receipt.<br>
                Please save it for your records.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });
    console.log("Donor thank-you email sent to:", donation.email);
  } catch (error) {
    console.error("Failed to send donor thank-you email:", error);
  }
}

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
      )?.value || 'Anonymous';

      const amountInMainCurrency = amount / 100;

      // Save donation to database
      const { error: insertError } = await supabase
        .from('donations')
        .insert({
          email: customer.email,
          donor_name: donorName,
          amount: amountInMainCurrency,
          currency,
          reference,
          channel,
          status: 'success',
          paid_at,
        });

      if (insertError) {
        console.error('Error saving donation:', insertError);
      }

      // Prepare donation data for emails
      const donationData = {
        donorName,
        email: customer.email,
        amount: amountInMainCurrency,
        currency,
        reference,
        channel,
        paidAt: paid_at,
      };

      // Send both emails in parallel
      await Promise.all([
        sendAdminNotification(donationData),
        sendDonorThankYouEmail(donationData),
      ]);
      
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Payment verified successfully',
          data: {
            amount: amountInMainCurrency,
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

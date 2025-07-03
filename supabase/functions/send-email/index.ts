import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  subject: string;
  message: string;
  messageId?: string;
  emailType?: string;
  recipientName?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, message, messageId, emailType = 'reply', recipientName }: EmailRequest = await req.json();

    // Get auth header to identify sender
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Get sender info if authenticated
    let senderId = null;
    if (token) {
      const { data: { user } } = await supabase.auth.getUser(token);
      senderId = user?.id || null;
    }

    // Create email log entry (pending status)
    const { data: emailLogData, error: logError } = await supabase
      .from('email_logs')
      .insert({
        sender_id: senderId,
        recipient_email: to,
        recipient_name: recipientName,
        subject: subject,
        message: message,
        email_type: emailType,
        status: 'pending',
        metadata: { messageId: messageId || null }
      })
      .select('id')
      .single();

    if (logError) {
      console.error('Error creating email log:', logError);
    }

    const emailLogId = emailLogData?.id;

    // Send email via Resend
    const emailResponse = await resend.emails.send({
      from: "Admin <onboarding@resend.dev>",
      to: [to],
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed;">Response from Admin</h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <p style="color: #64748b; font-size: 14px;">
            This is a response to your recent message. If you have any further questions, please don't hesitate to reach out.
          </p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
          <p style="color: #94a3b8; font-size: 12px;">
            Best regards,<br>
            The Admin Team
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    // Update email log with success status and Resend ID
    if (emailLogId) {
      await supabase
        .from('email_logs')
        .update({
          status: 'sent',
          resend_id: emailResponse.data?.id,
          sent_at: new Date().toISOString(),
          error_message: null
        })
        .eq('id', emailLogId);
    }

    // Mark message as replied in database if messageId provided
    if (messageId) {
      const { error: updateError } = await supabase
        .from('contact_messages')
        .update({ replied: true, read: true })
        .eq('id', messageId);

      if (updateError) {
        console.error('Error updating message status:', updateError);
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      emailResponse 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-email function:", error);

    // Update email log with error status if we have the log ID
    const logId = req.headers.get('x-email-log-id');
    if (logId) {
      try {
        const supabase = createClient(
          Deno.env.get('SUPABASE_URL')!,
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
        );
        
        await supabase
          .from('email_logs')
          .update({
            status: 'failed',
            error_message: error.message || 'Failed to send email'
          })
          .eq('id', logId);
      } catch (logError) {
        console.error('Error updating email log:', logError);
      }
    }

    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to send email'
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  type: 'contact' | 'comment';
  data: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    articleTitle?: string;
    commentContent?: string;
    articleId?: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data }: NotificationRequest = await req.json();

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    let emailSubject = '';
    let emailHtml = '';
    const adminEmail = 'gfibionjosephmutua@gmail.com'; // Admin email

    if (type === 'contact') {
      emailSubject = `New Contact Form Submission: ${data.subject || 'No Subject'}`;
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed;">New Contact Form Submission</h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>From:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Subject:</strong> ${data.subject || 'No Subject'}</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 15px 0;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${data.message}</p>
          </div>
          <p style="color: #64748b; font-size: 14px;">
            You can reply to this contact form submission from the admin panel.
          </p>
        </div>
      `;
    } else if (type === 'comment') {
      emailSubject = `New Comment on Article: ${data.articleTitle || 'Article'}`;
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed;">New Comment Posted</h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Article:</strong> ${data.articleTitle || 'Unknown Article'}</p>
            <p><strong>Commenter:</strong> ${data.name}</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 15px 0;">
            <p><strong>Comment:</strong></p>
            <p style="white-space: pre-wrap;">${data.commentContent}</p>
          </div>
          ${data.articleId ? `
            <p style="color: #64748b; font-size: 14px;">
              <a href="https://josephmgfibion.org/articles/${data.articleId}" style="color: #7c3aed;">View Article & Comment</a>
            </p>
          ` : ''}
        </div>
      `;
    } else {
      throw new Error('Invalid notification type');
    }

    // Send email via Resend
    const emailResponse = await resend.emails.send({
      from: "Portfolio Notifications <onboarding@resend.dev>",
      to: [adminEmail],
      subject: emailSubject,
      html: emailHtml,
    });

    console.log(`Admin notification sent successfully for ${type}:`, emailResponse);

    // Log the notification
    await supabase
      .from('email_logs')
      .insert({
        recipient_email: adminEmail,
        recipient_name: 'Admin',
        subject: emailSubject,
        message: `Notification sent for ${type}`,
        email_type: 'notification',
        status: 'sent',
        resend_id: emailResponse.data?.id,
        sent_at: new Date().toISOString(),
        metadata: { notification_type: type, ...data }
      });

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
    console.error("Error in notify-admin function:", error);

    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to send notification'
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

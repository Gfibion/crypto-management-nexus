
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationId } = await req.json();
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get conversation context (last few messages)
    const { data: recentMessages } = await supabaseClient
      .from('chat_messages')
      .select('content, message_type')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: false })
      .limit(10);

    const messages = [
      {
        role: 'system',
        content: 'You are a helpful AI assistant for a business consulting service. You can answer general questions about business, entrepreneurship, and financial consultation. If users need detailed personalized advice, suggest they wait for the human consultant or schedule a consultation. Keep responses concise and professional.'
      }
    ];

    // Add recent conversation context
    if (recentMessages) {
      recentMessages.reverse().forEach(msg => {
        messages.push({
          role: msg.message_type === 'user' ? 'user' : 'assistant',
          content: msg.content
        });
      });
    }

    // Add current message
    messages.push({
      role: 'user',
      content: message
    });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
        stream: false,
      }),
    });

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Save AI response to database
    await supabaseClient
      .from('chat_messages')
      .insert({
        conversation_id: conversationId,
        content: aiResponse,
        message_type: 'ai',
        sender_id: null
      });

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in AI chat:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

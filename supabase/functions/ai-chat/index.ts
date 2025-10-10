
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
    const { message, conversationId, chatType } = await req.json();
    
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

    // Knowledge base for site-specific questions
    const websiteKnowledgeBase = `
# WEBSITE KNOWLEDGE BASE - GFIBION JOSEPH MUTUA

## ABOUT GFIBION JOSEPH MUTUA
- Full Name: Gfibion Joseph Mutua
- Professional Title: Emerging Business Professional & ICT Consultant
- Background: Fresh graduate with strong foundation in business management and technology
- Location: Kenya

## SERVICES OFFERED
### Business Management Services:
1. Strategic Business Planning - Vision development, market analysis, KPI tracking
2. Process Optimization - Workflow analysis, efficiency enhancement
3. Organizational Development - Structure design, change management
4. Financial Planning & Analysis - Budget planning, financial modeling
5. Market Research & Analysis - Industry trends, competitor analysis
6. Business Consulting - Strategic advisory, growth strategy

### ICT & Technology Services:
1. Digital Transformation - Digital strategy, process automation
2. Technology Integration - System integration, modernization
3. Business Intelligence & Analytics - Data analytics, reporting systems
4. IT Strategy & Planning - Infrastructure planning, technology assessment
5. Cybersecurity Consulting - Security assessment, risk management
6. Cloud Solutions - Cloud migration, infrastructure design

## KEY SKILLS & EXPERTISE
- Strategic Planning, Business Analysis, Project Management (Advanced)
- Business Intelligence, Data Analytics (Advanced)
- Cloud Computing, AI & Automation (Intermediate)
- Fresh graduate with 15+ academic projects and 5+ certifications

## CORE VALUES
Innovation, Integrity, Excellence

## CONTACT & CONSULTATION
- Live Chat: Available 24/7 (AI) and during business hours (Human)
- Free initial consultation available
- Response within business hours

## TARGET AUDIENCE
SMBs, startups, organizations seeking digital transformation and strategic guidance

Visit website: https://gfibionjosephmutua.lovable.app
`;

    const systemPrompt = chatType === 'site-questions' 
      ? `You are a knowledgeable AI assistant specifically trained on Gfibion Joseph Mutua's business consulting and ICT services.

IMPORTANT INSTRUCTIONS:
1. Use ONLY the information from the knowledge base below to answer questions
2. Be specific about services, expertise, and capabilities
3. If asked about services not in the knowledge base, politely say it's not offered
4. Direct users to book consultations for detailed personalized advice
5. Be professional, friendly, and concise
6. Never make up information - stick to the facts in the knowledge base

KNOWLEDGE BASE:
${websiteKnowledgeBase}

Answer questions accurately based on this information. If something isn't covered, suggest booking a free consultation to discuss specific needs.`
      : 'You are a helpful AI assistant for a business consulting service. You can answer general questions about business, entrepreneurship, and financial consultation. If users need detailed personalized advice, suggest they wait for the human consultant or schedule a consultation. Keep responses concise and professional.';

    const messages = [
      {
        role: 'system',
        content: systemPrompt
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

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const rawCount = typeof body?.count === 'number' ? body.count : parseInt(String(body?.count ?? 3));
    const category = typeof body?.category === 'string' ? body.category : 'technology';
    const count = Math.min(Math.max(isNaN(rawCount) ? 3 : rawCount, 1), 10);

    const NEWS_API_KEY = Deno.env.get('NEWS_API_KEY');
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!NEWS_API_KEY) {
      return new Response(JSON.stringify({ error: 'NEWS_API_KEY not configured. Add it in Cloud secrets.' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: 'LOVABLE_API_KEY missing in Cloud. Contact support.' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    

    // Fetch news from NewsAPI with proper error handling
    let newsResponse;
    try {
      const params = new URLSearchParams({ country: 'us', language: 'en', pageSize: String(count) });
      if (category && category !== 'general') params.set('category', category);
      params.set('apiKey', NEWS_API_KEY!);
      newsResponse = await fetch(`https://newsapi.org/v2/top-headlines?${params.toString()}`);
    } catch (_) {
      throw new Error('Failed to connect to NewsAPI.');
    }

    if (!newsResponse.ok) {
      const errorText = await newsResponse.text();
      throw new Error(`NewsAPI error ${newsResponse.status}: ${errorText}`);
    }

    const newsData = await newsResponse.json();
    if (!newsData.articles || newsData.articles.length === 0) {
      throw new Error('No articles returned by NewsAPI for the selected category.');
    }

    

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    const generatedArticles = [];

    // Process each news article with OpenAI
    for (const newsArticle of newsData.articles) {
      try {
        

        // Create a comprehensive prompt for OpenAI with the knowledge base
        const prompt = `Based on this news article, create an engaging, well-structured blog post.

Original News:
Title: ${newsArticle.title}
Description: ${newsArticle.description || 'N/A'}
Content: ${newsArticle.content || newsArticle.description || 'N/A'}
Source: ${newsArticle.source?.name || 'Unknown'}
Published: ${newsArticle.publishedAt || 'Unknown'}

Requirements:
1. Create an attention-grabbing title (different from the original)
2. Write a compelling excerpt (150-200 characters)
3. Generate comprehensive content (500-800 words) with:
   - Professional tone, informative and engaging
   - Original insights or analysis based on current events
   - Structured with intro paragraph, subheadings, and conclusion
   - In-depth analysis and insights
   - Relevant examples or implications
4. Use HTML formatting (<h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>)
5. Make it informative, engaging, and SEO-friendly
6. Add unique perspectives and insights beyond the original news
7. Maintain accuracy and cite the event or topic context

Format your response as JSON:
{
  "title": "Your creative title here",
  "excerpt": "Compelling excerpt here",
  "content": "Full HTML formatted article here"
}`;

        // Generate article content via Lovable AI Gateway
        let aiResponse;
        try {
          aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${LOVABLE_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'google/gemini-2.5-flash',
              messages: [
                { role: 'system', content: 'You are an expert journalist. Produce valid JSON only.' },
                { role: 'user', content: prompt }
              ]
            }),
          });
        } catch (_) {
          throw new Error('Failed to connect to AI gateway');
        }
        if (!aiResponse.ok) {
          if (aiResponse.status === 429) throw new Error('AI rate limit exceeded. Please try again later.');
          if (aiResponse.status === 402) throw new Error('Payment required for AI usage.');
          const t = await aiResponse.text();
          throw new Error(`AI gateway error ${aiResponse.status}: ${t}`);
        }
        const aiData = await aiResponse.json();
        const contentStr = aiData.choices?.[0]?.message?.content;
        if (!contentStr) throw new Error('AI returned empty content');
        const generatedContent = JSON.parse(contentStr);

        // Calculate read time (average 200 words per minute)
        const wordCount = generatedContent.content.split(/\s+/).length;
        const readTime = Math.ceil(wordCount / 200);

        // Insert article into database
        const { data: article, error: insertError } = await supabase
          .from('articles')
          .insert({
            title: generatedContent.title,
            excerpt: generatedContent.excerpt,
            content: generatedContent.content,
            category: category.charAt(0).toUpperCase() + category.slice(1),
            featured_image: newsArticle.urlToImage || '/lovable-uploads/8b735fe1-3282-48d6-9daa-a0e5ecb43911.png',
            published: true,
            featured: false,
            read_time: readTime,
            tags: [category, 'AI Generated', 'News'],
            slug: generatedContent.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          })
          .select()
          .single();

        if (insertError) {
          throw insertError;
        }

        
        generatedArticles.push(article);

      } catch (_articleError) {
        // Continue with next article instead of failing completely
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        generated: generatedArticles.length,
        articles: generatedArticles
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    
    return new Response(
      JSON.stringify({
        error: error.message || 'Failed to generate articles'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

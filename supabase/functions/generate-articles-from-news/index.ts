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
    const { count = 3, category = 'technology' } = await req.json();
    
    const NEWS_API_KEY = Deno.env.get('NEWS_API_KEY');
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    console.log('Checking API keys...');
    console.log('NEWS_API_KEY configured:', !!NEWS_API_KEY);
    console.log('OPENAI_API_KEY configured:', !!OPENAI_API_KEY);
    
    if (!NEWS_API_KEY) {
      console.error('NEWS_API_KEY is not configured in Lovable Cloud secrets');
      throw new Error('NEWS_API_KEY not configured. Please add it in Lovable Cloud secrets.');
    }
    if (!OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not configured in Lovable Cloud secrets');
      throw new Error('OPENAI_API_KEY not configured. Please add it in Lovable Cloud secrets.');
    }

    console.log(`Fetching ${count} news articles from category: ${category}`);

    // Fetch news from NewsAPI with proper error handling
    let newsResponse;
    try {
      newsResponse = await fetch(
        `https://newsapi.org/v2/top-headlines?category=${category}&language=en&pageSize=${count}&apiKey=${NEWS_API_KEY}`
      );
    } catch (fetchError) {
      console.error('NewsAPI fetch error:', fetchError);
      throw new Error('Failed to connect to NewsAPI. Please check your internet connection.');
    }

    if (!newsResponse.ok) {
      const errorText = await newsResponse.text();
      console.error('NewsAPI error response:', errorText);
      throw new Error(`NewsAPI returned error ${newsResponse.status}. Check your NEWS_API_KEY.`);
    }

    const newsData = await newsResponse.json();
    
    if (!newsData.articles || newsData.articles.length === 0) {
      throw new Error('No articles found from NewsAPI');
    }

    console.log(`Fetched ${newsData.articles.length} articles from NewsAPI`);

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    const generatedArticles = [];

    // Process each news article with OpenAI
    for (const newsArticle of newsData.articles) {
      try {
        console.log(`Processing: ${newsArticle.title}`);

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

        // Call OpenAI with proper error handling
        console.log('Calling OpenAI API for article generation...');
        let openaiResponse;
        try {
          openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${OPENAI_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'gpt-5-mini-2025-08-07',
              messages: [
                {
                  role: 'system',
                  content: `You are an expert business and technology journalist. When prompted, your job is to generate an original, insightful, and well-structured article based on the latest relevant news content.

1. Use the provided news content to extract key facts, themes, events, and developments.

2. Write a unique article (not copied or reworded from the source), with the following qualities:
   - Professional tone, informative and engaging
   - Original insights or analysis based on current events
   - Structured with a title, intro paragraph, subheadings, and conclusion
   - 500–800 words in length

3. Maintain accuracy and cite the event or topic context (e.g., "According to reports published on [date]…").

Only generate content based on recent, verifiable data from the news. Avoid fabricating facts. Always respond with valid JSON.`
                },
                {
                  role: 'user',
                  content: prompt
                }
              ],
              max_completion_tokens: 2000,
              response_format: { type: "json_object" }
            }),
          });
        } catch (fetchError) {
          console.error('OpenAI fetch error:', fetchError);
          throw new Error('Failed to connect to OpenAI API');
        }

        if (!openaiResponse.ok) {
          const errorText = await openaiResponse.text();
          console.error('OpenAI error response:', errorText);
          throw new Error(`OpenAI API error ${openaiResponse.status}. Check your OPENAI_API_KEY.`);
        }

        const openaiData = await openaiResponse.json();
        console.log('OpenAI response received');
        
        if (!openaiData.choices || !openaiData.choices[0]?.message?.content) {
          console.error('Invalid OpenAI response structure:', openaiData);
          throw new Error('OpenAI returned invalid response structure');
        }

        console.log('Parsing generated content...');
        const generatedContent = JSON.parse(openaiData.choices[0].message.content);
        console.log('Generated article title:', generatedContent.title);

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
          console.error('Database insert error:', insertError);
          throw insertError;
        }

        console.log(`Successfully generated article: ${article.title}`);
        generatedArticles.push(article);

      } catch (articleError) {
        console.error(`Error processing article "${newsArticle.title}":`, articleError);
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
    console.error('Error in generate-articles-from-news function:', error);
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

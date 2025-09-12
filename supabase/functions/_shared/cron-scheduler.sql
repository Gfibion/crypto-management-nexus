-- Enable the pg_cron extension
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule the auto-generate-articles function to run every 3 days at 6:00 AM UTC
SELECT cron.schedule(
  'auto-generate-articles',
  '0 6 */3 * *', -- Every 3 days at 6:00 AM
  'SELECT net.http_post(
    url := ''https://plnoqiktsyqwcwzlueri.supabase.co/functions/v1/auto-generate-articles'',
    headers := ''{"Content-Type": "application/json", "Authorization": "Bearer " || current_setting(''''app.settings.service_role_key'''')}'',
    body := ''{}''::jsonb
  );'
);

-- Schedule cleanup job to run daily at 2:00 AM UTC to remove old articles
SELECT cron.schedule(
  'cleanup-old-articles',
  '0 2 * * *', -- Daily at 2:00 AM
  'DELETE FROM articles WHERE created_at < NOW() - INTERVAL ''2 months'';'
);

-- View scheduled jobs
SELECT * FROM cron.job;
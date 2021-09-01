SELECT 
  platform,
  event,
  user_id,
  created_at,
  payload
FROM analytics
ORDER BY created_at DESC 
LIMIT 500
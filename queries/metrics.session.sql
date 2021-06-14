SELECT 
  platform,
  event,
  user_id,
  created_at,
  payload
FROM metrics
ORDER BY created_at DESC 

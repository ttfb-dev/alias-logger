SELECT 
  level, 
  source, 
  created_at, 
  JSONExtractString(payload, 'message') AS message, 
  JSONExtractString(payload, 'method') AS method, 
  payload
FROM log 
WHERE level = 'critical' 
ORDER BY created_at DESC
LIMIT 100
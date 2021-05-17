SELECT 
  level, 
  source, 
  created_at, 
  JSONExtractString(payload, 'method') AS method, 
  JSONExtractString(payload, 'message') AS message, 
  payload,
  toDate(created_at) as date
FROM log
WHERE date = today()
ORDER BY created_at DESC
LIMIT 500
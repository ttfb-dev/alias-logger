SELECT 
  level, 
  source, 
  JSONExtractString(payload, 'method') AS method, 
  payload
FROM log WHERE level = 'error' LIMIT 100
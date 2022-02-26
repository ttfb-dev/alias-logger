SELECT level,
  source,
  created_at,
  JSONExtractString(payload, 'message') AS message,
  JSONExtractString(payload, 'status') AS status,
  payload,
  toDate(created_at) as date
FROM log
ORDER BY created_at DESC
LIMIT 500
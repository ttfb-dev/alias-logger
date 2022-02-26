SELECT platform,
  event,
  JSONExtractString(payload, 'word') AS word,
  JSONExtractInt(payload, 'duration') AS duration,
  created_at,
  payload
FROM analytics
WHERE event = 'word.guessing_duration'
ORDER BY duration DESC
LIMIT 500
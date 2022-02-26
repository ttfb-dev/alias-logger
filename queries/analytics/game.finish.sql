SELECT platform,
  event,
  user_id,
  created_at,
  JSONExtractString(payload, 'reason') AS reason,
  payload
FROM analytics
WHERE event = 'game.finish'
ORDER BY created_at DESC
LIMIT 500
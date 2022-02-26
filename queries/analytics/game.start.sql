SELECT platform,
  event,
  created_at,
  payload
FROM analytics
WHERE event = 'game.start'
ORDER BY created_at DESC
LIMIT 500
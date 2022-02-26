SELECT toDate(created_at) as date,
  count(*)
FROM analytics
WHERE event = 'game.start'
GROUP BY date
ORDER BY date DESC
LIMIT 500
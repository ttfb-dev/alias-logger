SELECT toDate(created_at) as date,
  JSONExtractString(payload, 'join_method') as method,
  count(*) as cnt
FROM analytics
WHERE event = 'room.join'
GROUP BY date,
  method
ORDER BY date DESC
LIMIT 21
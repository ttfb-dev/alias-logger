SELECT
  count(*) as count,
  JSONExtractString(payload, 'word') AS word,
  JSONExtractBool(payload, 'guessed') AS guessed
FROM analytics
WHERE event = 'word.guessing_result'
  AND guessed = 1
GROUP BY word, guessed
ORDER BY count DESC
LIMIT 500
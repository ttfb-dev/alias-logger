SELECT created_at,
  JSONExtractBool(payload, 'isOnboardingFinished') AS onboard,
  JSONExtractString(payload, 'platform') AS platform,
  JSONExtractString(payload, 'panel') AS panel,
  JSONExtractString(payload, 'userId') AS userId,
  payload,
  toDate(created_at) as date
FROM log
WHERE level = 'debug'
ORDER BY created_at DESC
LIMIT 500
import { ClickHouse } from 'clickhouse';

const clickhouse = new ClickHouse(
  {
    url: process.env.CLICKHOUSE_HOST,
    port: process.env.CLICKHOUSE_PORT,
    debug: false,
    basicAuth: {
      username: process.env.CLICKHOUSE_USER,
      password: process.env.CLICKHOUSE_PASSWORD,
    },
    isUseGzip: false,
    format: "json",
    raw: false,
    config: {
      session_timeout                         : 60,
      output_format_json_quote_64bit_integers : 0,
      enable_http_compression                 : 0,
      database                                : process.env.CLICKHOUSE_DB,
    },
  }
);

const insertQuery = `INSERT INTO analytics (platform, event, user_id, payload, os, browser, device, ip)`

const analytics = {
  write: async (platform, event, user_id, data) => {
    const { os, browser, device, ip, ...payload } = data;
    await insertRow(platform, event, user_id, payload, os, browser, device, ip);
  },
}

const insertRow = async (platform, event, user_id, payload, os, browser, device, ip) => {
  const row = {
    platform,
    event,
    user_id,
    payload: JSON.stringify(payload ?? {}),
    os: JSON.stringify(os ?? {}),
    browser: JSON.stringify(browser ?? {}),
    device: JSON.stringify(device ?? {}),
    ip: ip ?? null
  };
  try {
    await clickhouse.insert(insertQuery, [row]).toPromise();
  } catch ({message}) {
    console.error('analytics instert row failed', row);
  }
}


export default analytics;

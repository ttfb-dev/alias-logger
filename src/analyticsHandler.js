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

const insertQuery = `INSERT INTO analytics VALUES (generateUUIDv4(), platform, action, user_id, payload)`

const analytics = {
  write: async (platform, action, user_id, payload) => {
    await insertRow(platform, action, user_id, payload);
  },
}

const insertRow = async (platform, action, user_id, payload) => {
  await clickhouse.insert(insertQuery, [{
    platform,
    action,
    user_id,
    payload: JSON.stringify(payload)
  }]).toPromise();
}


export default analytics;
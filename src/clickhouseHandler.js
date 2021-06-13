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

const insertQuery = `INSERT INTO log (level, source, payload)`

const logger = {
    debug: async (source, payload) => {
        await insertRow('debug', source, payload);
    },
    info: async (source, payload) => {
        await insertRow('info', source, payload);
    },
    warning: async (source, payload) => {
        await insertRow('warning', source, payload);
    },
    error: async (source, payload) => {
        await insertRow('error', source, payload);
    },
    critical: async (source, payload) => {
        await insertRow('critical', source, payload);
    },
    analytics: async (platform, action, payload) => {
        await insertRow('analytics', platform, { action, ...payload });
    },
}

const insertRow = async (level, source, payload) => {
    await clickhouse.insert(insertQuery, [{
        level: level,
        source: source,
        payload: JSON.stringify(payload)
    }]).toPromise();
}


export default logger;

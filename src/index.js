import express from 'express'
import bodyParser from 'body-parser'
import logger from './loggerHandler.js'
import notifier from './notifier.js'
import analytics from './analyticsHandler.js'

const app = express()
const port = 80
app.use(bodyParser.json())

app.post('/service/:service/debug', async (req, res) => {
    await logger.debug(req.params.service, req.body);
    res.status(200).send();
})

app.post('/service/:service/info', async (req, res) => {
    await logger.info(req.params.service, req.body);
    res.status(200).send();
})

app.post('/service/:service/warning', async (req, res) => {
    await logger.warning(req.params.service, req.body);
    res.status(200).send();
})

app.post('/service/:service/error', async (req, res) => {
    await logger.error(req.params.service, req.body);
    res.status(200).send();
})

app.post('/service/:service/critical', async (req, res) => {
    await notifier.tgCritical(`${req.params.service}:\t${req.body.message ?? 'no_message'}\n${JSON.stringify(req.body)}`);
    await logger.critical(req.params.service, req.body);
    res.status(200).send();
})

app.post('/analytics/service/:platform/action/:event/user_id/:user_id', async (req, res) => {
    await analytics.write(req.params.platform, req.params.event, parseInt(req.params.user_id), req.body);
    res.status(200).send();
})

app.get('/', async (req, res) => {
    res.status(200).send();
})

app.listen(port)

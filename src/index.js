const express = require('express')
const bodyParser = require('body-parser')
const logger = require('./clickhouseHandler')

const app = express()
const port = 80
app.use(bodyParser.json())

app.post('/service/:service/debug', async (req, res) => {
    logger.debug(req.params.service, req.body);
    res.status(200).send();
})

app.post('/service/:service/info', async (req, res) => {
    logger.info(req.params.service, req.body);
    res.status(200).send();
})

app.post('/service/:service/warning', async (req, res) => {
    logger.warning(req.params.service, req.body);
    res.status(200).send();
})

app.post('/service/:service/error', async (req, res) => {
    logger.error(req.params.service, req.body);
    res.status(200).send();
})

app.post('/service/:service/critical', async (req, res) => {
    logger.critical(req.params.service, req.body);
    res.status(200).send();
})

app.post('/analytics/service/:service/action/:action', async (req, res) => {
    logger.analytics(req.params.service, req.params.action, req.body);
    res.status(200).send();
})

app.get('/', async (req, res) => {
    res.status(200).send();
})

app.listen(port)

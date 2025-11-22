// app/server.js
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const models = require('./models');
const pino = require('pino');


const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
const app = express();
app.use(bodyParser.json());


// basic request logger
app.use((req, res, next) => {
logger.info({ method: req.method, url: req.url }, 'incoming request');
next();
});


app.use('/', routes);


const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://mongo:27017';


async function start() {
try {
await models.connect(MONGO_URL, process.env.DB_NAME || 'notesdb');
app.listen(PORT, () => logger.info({ port: PORT }, 'server started'));
} catch (e) {
logger.error({ err: e }, 'failed to start');
process.exit(1);
}
}


start();
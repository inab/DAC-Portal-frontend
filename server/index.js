import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initDb from './db';
import winston from 'winston';
import userRoutes from './routes/user';
import dacRoutes from './routes/dac';
import { keycloak, sessionData, serverConf } from './config';
import 'express-async-errors';
import errors from './middleware/errors';
require('dotenv').config();
require('./logs')();

let app = express();

app.server = http.createServer(app);

app.use(morgan('dev'));

app.use(cors({
	exposedHeaders: serverConf.corsHeaders
}));

app.use(bodyParser.json({
	limit : serverConf.bodyLimit
}));

app.use(sessionData);

app.use(keycloak.middleware());

app.set('trust proxy', true);

initDb( db => {

	app.use('/user', userRoutes({ serverConf, db, keycloak }));

	app.use('/dac', dacRoutes({ serverConf, db, keycloak }));

	app.use(errors)

	app.server.listen(process.env.PORT || serverConf.port, () => {
		console.log(`Started on port ${app.server.address().port}`);
	});
});

export default app;



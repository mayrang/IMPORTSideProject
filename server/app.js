import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import authRouter from './router/auth.js';
import reservationRouter from './router/reservation.js'
import holidayRouter from './router/holiday.js'
import { config } from './config.js';

const app = express();

app.use(express.json());
// app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
// app.use(morgan('tiny'));

app.use('/auth', authRouter);

app.use('/reservation',reservationRouter);
app.use('/holiday',holidayRouter);

app.use((req, res, next) => {
    res.sendStatus(404);
});

app.use((error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
});

app.listen(config.port);
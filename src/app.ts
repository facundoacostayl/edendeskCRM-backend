import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import {router} from './routes/index.route';
const app = express();
const port = 4000;

//Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/2.0', router);

export default app;

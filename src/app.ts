import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './routes/user.routes';
const app = express();
const port = 4000;

//Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(userRoutes);
app.use(express.json());

export default app;

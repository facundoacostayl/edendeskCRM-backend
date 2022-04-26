import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './routes/user.routes';
import dashboardRoute from './routes/app.routes';
const app = express();
const port = 4000;

//Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(userRoutes);
app.use(dashboardRoute)

export default app;

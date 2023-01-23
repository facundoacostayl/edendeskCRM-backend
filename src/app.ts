import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import {router} from './routes/index.route';
import swaggerUi from 'swagger-ui-express';
import swaggerSetup from './docs/swagger';
const app = express();
const port = 4000;

//Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/2.0', router);
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSetup));

export default app;

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
const app = express();
const port = 4000;

//Middlewares
app.use(cors());
app.use(morgan('dev'))

app.listen(port);
console.log("Server is online")
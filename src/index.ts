import "reflect-metadata";
import app from './app';
import {AppDataSource} from './db';

const main = async() => {
   await AppDataSource.initialize()
   app.listen(4000);
   console.log("Server is online")
}

main();

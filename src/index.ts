import "reflect-metadata";
import app from './app';
import { AppDataSource } from './db';

const main = async () => {
   try {
      await AppDataSource.initialize()
      app.listen(process.env.PORT || 4000);
      console.log("Server is online")
   } catch (err) {
      console.error(err)
   }
}

main();

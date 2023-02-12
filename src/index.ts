import "reflect-metadata";
import { app, port } from "./app";
import { AppDataSource } from "./config/db/db";

const main = async () => {
  try {
    await AppDataSource.initialize();
    app.listen(process.env.PORT || port);
    console.log("Server is online");
  } catch (err) {
    console.error(err);
  }
};

main();

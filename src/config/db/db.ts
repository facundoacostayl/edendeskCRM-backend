import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Client } from "../entities/Client";
import { Operation } from "../entities/Operation";
import * as dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.dbusername,
  database: process.env.dbdatabase,
  password: process.env.dbpassword,
  entities: [User, Client, Operation],
  logging: true,
  synchronize: true,
});

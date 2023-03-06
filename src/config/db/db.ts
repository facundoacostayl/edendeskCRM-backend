import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Client } from "../entities/Client";
import { Operation } from "../entities/Operation";
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } from "../config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT ? parseInt(DB_PORT) : 5432,
  username: DB_USER,
  database: DB_NAME,
  password: DB_PASSWORD,
  entities: [User, Client, Operation],
  logging: true,
  synchronize: true,
});

import * as dotenv from "dotenv";
dotenv.config();

const DB_HOST = "dpg-cjtf9d15mpss73d723dg-a" || process.env.DEV_DB_HOST;
const DB_USER = "edenbest_user" || process.env.DEV_DB_USERNAME;
const DB_PASSWORD =
  "KMHTMTYA2z4bRU81F4RlmFKUDuSl7qfr" || process.env.DEV_DB_PASSWORD;
const DB_NAME = "edenbest" || process.env.DEV_DB_DATABASE;
const DB_PORT = "5432" || process.env.DEV_DB_PORT;

export { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT };

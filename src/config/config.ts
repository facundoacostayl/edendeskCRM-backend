import * as dotenv from "dotenv";
dotenv.config();

const DB_HOST = process.env.PROD_DB_HOST || process.env.DEV_DB_HOST;
const DB_USER = process.env.PROD_DB_USERNAME || process.env.DEV_DB_USERNAME;
const DB_PASSWORD = process.env.PROD_DB_PASSWORD || process.env.DEV_DB_PASSWORD;
const DB_NAME = process.env.PROD_DB_NAME || process.env.DEV_DB_DATABASE;
const DB_PORT = process.env.PROD_DB_PORT || process.env.DEV_DB_PORT;

export { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT };

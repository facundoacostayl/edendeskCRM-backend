"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const Client_1 = require("../entities/Client");
const Operation_1 = require("../entities/Operation");
const config_1 = require("../config");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: config_1.DB_HOST,
    port: config_1.DB_PORT ? parseInt(config_1.DB_PORT) : 5432,
    username: config_1.DB_USER,
    database: config_1.DB_NAME,
    password: config_1.DB_PASSWORD,
    entities: [User_1.User, Client_1.Client, Operation_1.Operation],
    logging: true,
    synchronize: true,
});

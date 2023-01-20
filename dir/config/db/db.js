"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const Client_1 = require("../entities/Client");
const Operation_1 = require("../entities/Operation");
require('dotenv').config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: "localhost",
    port: 5432,
    username: process.env.dbusername,
    database: process.env.dbdatabase,
    password: process.env.dbpassword,
    entities: [User_1.User, Client_1.Client, Operation_1.Operation],
    logging: true,
    synchronize: true,
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const Client_1 = require("./entities/Client");
const Operation_1 = require("./entities/Operation");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'ec2-52-73-184-24.compute-1.amazonaws.com',
    username: 'vrbiwobodixryp',
    password: '1d8500ba49d3ce699b15263b20887801d91e1b540bee285b9ef43b9bec8ab728',
    database: 'd6rakb1o10u453',
    port: 5432,
    entities: [User_1.User, Client_1.Client, Operation_1.Operation],
    logging: true,
    synchronize: true
});

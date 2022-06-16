import {DataSource} from 'typeorm';
import {User} from './entities/User'; 
import {Client} from './entities/Client';
import {Operation} from './entities/Operation';
require('dotenv').config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.dbhost,
    username: process.env.dbusername,
    password: process.env.dbpassword,
    database: process.env.dbdatabase,
    port: 5432,
    entities: [User, Client, Operation],
    logging: true,
    synchronize: false,
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});
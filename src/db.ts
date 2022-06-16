import {DataSource} from 'typeorm';
import {User} from './entities/User'; 
import {Client} from './entities/Client';
import {Operation} from './entities/Operation';
require('dotenv').config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DB_URL,
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
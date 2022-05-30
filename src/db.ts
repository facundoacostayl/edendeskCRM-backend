import {DataSource} from 'typeorm';
import {User} from './entities/User'; 
import {Client} from './entities/Client';
import {Operation} from './entities/Operation';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'riverpasion10',
    database: 'edendesk',
    port: 5432,
    entities: [User, Client, Operation],
    logging: true,
    synchronize: true
});
import {DataSource} from 'typeorm';
import {User} from './entities/User'; 

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'riverpasion10',
    database: 'edendesk',
    port: 5432,
    entities: [User],
    logging: true,
    synchronize: true
});
import {DataSource} from 'typeorm'; 

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'riverpasion10',
    database: 'edendesk',
    port: 5432,
    entities: []
});
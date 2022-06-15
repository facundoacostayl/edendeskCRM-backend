import {DataSource} from 'typeorm';
import {User} from './entities/User'; 
import {Client} from './entities/Client';
import {Operation} from './entities/Operation';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'ec2-52-73-184-24.compute-1.amazonaws.com',
    username: 'vrbiwobodixryp',
    password: '1d8500ba49d3ce699b15263b20887801d91e1b540bee285b9ef43b9bec8ab728',
    database: 'd6rakb1o10u453',
    port: 5432,
    entities: [User, Client, Operation],
    logging: true,
    synchronize: true
});
import { Client } from "../config/entities/Client";
import { Operation } from "../config/entities/Operation";
import {ClientType} from '../interfaces/client.interface';
import {UserType} from '../interfaces/user.interface';

const getClients = async(userId: UserType['id']) => {
    const clientList = await Client.findBy({ userId });
    
    return clientList;
};

export {getClients};
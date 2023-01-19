import { Client } from "../config/entities/Client";
import { Operation } from "../config/entities/Operation";
import {ClientType} from '../interfaces/client.interface';

const getClients = async(userId) => {
    const clientList = await Client.findBy({ userId: parseInt(userId) });
}
import { UserType } from "./user.interface";
import { ClientType } from "./client.interface";
import {Client} from '../config/entities/Client';

interface Response {
    responseType: "Success" | "Error",
    statusCode: number,
    message?: string,
    data?: UserType | UserType[] | ClientType | ClientType[],
    token?: string | number
}

export {Response as ResponseType};
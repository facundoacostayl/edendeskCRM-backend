import { UserType } from "./user.interface";
import { ClientType } from "./client.interface";

interface Response {
    responseType: string,
    statusCode: number,
    message?: string,
    data?: UserType | ClientType
}

export {Response as ResponseType};
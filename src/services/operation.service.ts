import { Operation } from "../config/entities/Operation";
import { User } from "../config/entities/User";
import {UserType} from '../interfaces/user.interface';
import { AppDataSource as dataSource } from "../config/db/db";
import {responseHandler} from '../utils/response.handle';

const getFullOperationData = async(userid: UserType['id']) => {
    //Find operations
    const operations = await dataSource
    .getRepository(Operation)
    .createQueryBuilder('o')
    .innerJoinAndSelect(User, 'u', 'o.operationId = u.user')
    .where('o.operationId = :userid', {userid})
    .getMany();


    if(!operations) {
        return responseHandler('Error', 404, "Operations not found");
    };

    return responseHandler('Success', 200, 'Operations found succesfully', operations);

}
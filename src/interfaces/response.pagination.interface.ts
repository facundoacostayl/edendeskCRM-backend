import {UserType} from './user.interface';
import {ClientType} from './client.interface';

interface PaginationData {
    allValues: number,
    paginatedValues: UserType[] | ClientType[]
};

export {PaginationData as PaginationDataType};
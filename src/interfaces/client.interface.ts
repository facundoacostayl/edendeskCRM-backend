import {UserType} from './user.interface';

interface Client {
  clientId: number;
  firstName: string;
  lastName: string;
  balance: number;
  tel: string;
  lastAddDate: string;
  lastAddAmount: number;
  addType: string;
  lastWithdrawDate: string;
  lastWithdrawAmount: number;
  branch: string;
  user: UserType['id'];
}

export {Client as ClientType}
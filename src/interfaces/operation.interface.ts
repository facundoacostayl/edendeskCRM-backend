import {UserType} from './user.interface';

interface Operation {
    operationid: number;
    año: number;
    mes: number;
    gananciaUsuario: number;
    perdidaUsuario: number;
    totalDeSaldosUsuario: number;
    transaccionesDelDia: number;
    fechaDeCreacion: number;
    user: UserType['id'];
}

export {Operation as OperationType};
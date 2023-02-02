import {UserType} from './user.interface';

interface Operation {
    operationId: number;
    fechaDeCreacion: number;
    mesDeCreacion: number;
    añoDeCreacion: number;
    gananciaUsuario: number;
    perdidaUsuario: number;
    totalDeSaldosUsuario: number;
    transaccionesDelDia: number;
    user: UserType['id'];
}

export {Operation as OperationType};
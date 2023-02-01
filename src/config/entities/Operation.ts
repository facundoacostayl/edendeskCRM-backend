import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { User } from './User';

@Entity('operation')
export class Operation extends BaseEntity {
    @PrimaryGeneratedColumn()
    operationId: number;
    @Column()
    año: number;
    @Column()
    mes: number;
    @Column({
        nullable: true
    })
    gananciaUsuario: number;
    @Column({
        nullable: true
    })
    perdidaUsuario: number;
    @Column({
        nullable: true
    })
    totalDeSaldosUsuario: number
    @Column({
        nullable: true
    })
    transaccionesDelDia: number
    @Column({
        nullable: true
    })
    fechaDeCreacion: number;

    @ManyToOne(type => User, user => user.id)
    user: User['id']
}
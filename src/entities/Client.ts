import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { User } from './User';

@Entity('clients')
export class Client extends BaseEntity {

    @PrimaryGeneratedColumn()
    clientid: number
    @Column()
    nombre: string
    @Column()
    apellido: string
    @Column({
        nullable: true
    })
    saldo: number
    @Column()
    telefono: number
    @Column({
        nullable: true
    })
    fechaultcarga: string
    @Column({
        nullable: true
    })
    montoultcarga: number
    @Column({
        nullable: true
    })
    tipodecarga: string
    @Column({
        nullable: true
    })
    fechaultretiro: string
    @Column({
        nullable: true
    })
    montoultretiro: number
    @Column({
        nullable: true
    })
    sucursal: string
    @ManyToOne(() => User, user => user.clients)
    user: User["id"];
}
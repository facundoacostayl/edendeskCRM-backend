import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Client} from './Client';
import {Operation} from './Operation';

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number
    @Column({
        unique: true
    })
    loginEmail: string
    @Column()
    firstName: string
    @Column({
        nullable: true
    })
    lastName: string;
    @Column()
    password: string

    @OneToMany(type => Client, clients => clients.user)
    clients: Client[];

    @OneToMany(type => Operation, operations => operations.operationId)
    operations: Operation[];
}
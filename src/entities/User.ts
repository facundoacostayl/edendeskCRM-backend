import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Client } from './Client';

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number
    @Column({
        unique: true
    })
    loginemail: string
    @Column()
    firstname: string
    @Column()
    password: string
    @CreateDateColumn()
    createdAt: Date
    @OneToMany(() => Client, client => client.user, {
        cascade: true
    })
    clients: Client[];
}
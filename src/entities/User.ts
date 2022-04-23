import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number
    @Column()
    loginemail: string
    @Column()
    firstname: string
    @Column()
    lastname: string
    @Column()
    password: string
    @CreateDateColumn()
    createdAt: Date
}
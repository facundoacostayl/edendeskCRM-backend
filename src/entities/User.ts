import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('user')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number
    @Column()
    firstname: string
    @Column()
    lastname: string
    @Column()
    email: string
    @Column()
    password: string
    @CreateDateColumn()
    createdAt: Date

}
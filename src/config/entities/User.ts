import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToMany} from 'typeorm';

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
}
import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';

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
    @Column({
        nullable: true
    })
    lastname: string
    @Column()
    password: string
    @CreateDateColumn()
    createdAt: Date
}
import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { User } from './User';

@Entity('operation')
export class Operation {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
     rr: string
    @Column()
    nombre: string
    @ManyToOne(() => User, user => user)
    user: User;
}
import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { User } from './User';

@Entity('operation')
export class Operation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    year: Date
    @Column()
    month: Date
    @Column()
    userGain: number
    @Column()
    userLost: User;
    @Column()
    userId: number
}
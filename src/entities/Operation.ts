import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { User } from './User';

@Entity('operation')
export class Operation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    year: number
    @Column()
    month: number
    @Column()
    userGain: number
    @Column()
    userLost: number;
    @Column()
    userId: number
}
import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { User } from './User';

@Entity('operation')
export class Operation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    year: number;
    @Column()
    month: number;
    @Column({
        nullable: true
    })
    userGain: number;
    @Column({
        nullable: true
    })
    userLost: number;
    @Column({
        nullable: true
    })
    userTotalBalance: number
    @Column({
        nullable: true
    })
    dayTransactions: number
    @Column({
        nullable: true
    })
    createdAt: number;
    @Column()
    userId: number;
}
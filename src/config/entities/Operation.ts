import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity("operation")
export class Operation extends BaseEntity {
  @PrimaryGeneratedColumn()
  operationId: number;
  @Column({
    nullable: true,
  })
  creationDay: number;
  @Column()
  creationMonth: number;
  @Column()
  creationYear: number;
  @Column({
    nullable: true,
  })
  userEarnings: number;
  @Column({
    nullable: true,
  })
  userLosses: number;
  @Column({
    nullable: true,
  })
  totalSumOfBalances: number;
  @Column({
    nullable: true,
  })
  dayTransactions: number;

  @ManyToOne((type) => User, (user) => user.id)
  user: User["id"];
}

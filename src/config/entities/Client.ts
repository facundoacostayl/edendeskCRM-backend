import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Operation } from "./Operation";

@Entity("clients")
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn()
  clientId: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({
    nullable: true,
  })
  balance: number;
  @Column()
  tel: string;
  @Column({
    nullable: true,
  })
  lastAddDate: string;
  @Column({
    nullable: true,
  })
  lastAddAmount: number;
  @Column({
    nullable: true,
  })
  addType: string;
  @Column({
    nullable: true,
  })
  lastWithdrawDate: string;
  @Column({
    nullable: true,
  })
  lastWithdrawAmount: number;
  @Column({
    nullable: true,
  })
  branch: string;

  @OneToMany((type) => Operation, (operation) => operation.operationId)
  operation: Operation["operationId"];

  @ManyToOne((type) => User, (users) => users.id)
  user: User["id"];
}

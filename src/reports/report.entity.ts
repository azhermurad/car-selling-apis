

import { User } from 'src/users/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'double' })
  price: number;
  @Column()
  make: string;
  @Column()
  model: string;
  @Column()
  year: number;

  @Column()
  mileage: number;
  @Column()
  lng: number;
  @Column()
  lat: number;
  @Column({default:0})
  mige: number;

 

  @Column({ default: false })
  isPublish: boolean;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;

  @BeforeInsert()
  ruunnBefore() {
    this.make = this.make + '1';
  }
}

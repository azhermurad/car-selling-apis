import { Injectable } from '@nestjs/common';

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Report } from '../reports/report.entity';

@Entity()
@Injectable()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({default:true})
  isAdmin: boolean;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  // hooks in typeORM
  // @AfterLoad()
  // tracker() {
  //   console.log('this method is called from schema', this);
  //   this.password = this.password.toUpperCase();
  // }
  // @BeforeInsert()
  // securePassword() {
  //   console.log('Calling before saving any entiy in the databse');
  // }

  // @BeforeUpdate()
  // updateuser() {
  //   console.log('method is calling before user is update');
  // }
}

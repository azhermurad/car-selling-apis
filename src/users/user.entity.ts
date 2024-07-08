import { Injectable } from '@nestjs/common';
import { Report } from 'src/reports/report.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
@Injectable()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(()=>Report,(report)=>report.user)
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

import { Injectable } from '@nestjs/common';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
@Injectable()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;

  @Column()
  password: string;

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

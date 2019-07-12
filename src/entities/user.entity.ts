import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import { IsEmail, Validate } from 'class-validator';
import * as crypto from 'crypto';

@Entity('user')
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  @IsEmail()
  email: string;

  @Column({  })
  password: string;

  @BeforeInsert()
  hashPassword() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }
}

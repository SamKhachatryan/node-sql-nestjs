import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";
import { IsEmail } from 'class-validator';
import * as crypto from 'crypto';
import { Exclude } from "class-transformer";

import { BaseEntity } from "../shared/base/entity";

@Entity('user')
export class UserEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  @IsEmail()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @BeforeInsert()
  preCreate() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }
}

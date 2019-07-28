import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, AfterLoad } from "typeorm";
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
  private preCreate() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }

  @BeforeUpdate()
  private preUpdate() {
    if (this.password !== this.passwordTmp) {
      this.password = crypto.createHmac('sha256', this.password).digest('hex');
    }
  }

  @AfterLoad()
  private setPasswordTmp() {
    this.passwordTmp = this.password;
  }

  private passwordTmp: string;
}

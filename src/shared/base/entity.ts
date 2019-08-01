import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Exclude } from "class-transformer";

export class BaseEntity {

  @CreateDateColumn({ type: 'datetime' })
  createdDt: Date;

  @CreateDateColumn()
  @UpdateDateColumn({ type: 'datetime' })
  updatedDt: Date;

  @Column({ type: 'boolean', default: false })
  @Exclude()
  isDeleted: boolean;
}
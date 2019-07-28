import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity {

  @CreateDateColumn({ type: 'datetime' })
  createdDt: Date;

  @CreateDateColumn()
  @UpdateDateColumn({ type: 'datetime' })
  updatedDt: Date;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;
}
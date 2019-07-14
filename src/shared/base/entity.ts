import { BeforeInsert, Column, BeforeUpdate } from "typeorm";

export class BaseEntity {

  @Column('datetime')
  createdDt: Date;

  @Column('datetime')
  updatedDt: Date;

  @BeforeInsert()
  private basePreCreate() {
    this.createdDt = new Date();
    this.updatedDt = new Date();
  }

  @BeforeUpdate()
  private basePreUpdate() {
    this.updatedDt = new Date();
  }
}
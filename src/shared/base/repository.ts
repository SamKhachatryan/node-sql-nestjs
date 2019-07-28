import { Repository } from "typeorm";
import { BaseEntity } from "./entity";

export class BaseRepository<T extends BaseEntity> extends Repository<T> {

}
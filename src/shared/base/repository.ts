import { Repository, FindConditions, FindManyOptions, SelectQueryBuilder } from "typeorm";

import { BaseEntity } from "./entity";
import { IPaginationOptions } from "../interfaces/pagination-options";
import { Pagination } from "../models/pagination";


export class BaseRepository<T extends BaseEntity> extends Repository<T> {

  public async paginate(options: IPaginationOptions, searchOptions?: FindConditions<T> | FindManyOptions<T>): Promise<Pagination<T>> {
    const [ page, limit ] = this.resolveOptions(options);

    const [ items, total ] = await this.findAndCount({
      skip: page * limit,
      take: limit,
      ...searchOptions
    });

    return this.createPaginationObject<T>(items, total, limit);
  }

  public async paginateQueryBuilder(queryBuilder: SelectQueryBuilder<T>, options: IPaginationOptions): Promise<Pagination<T>> {
    const [ page, limit ] = this.resolveOptions(options);

    const [ items, total ] = await queryBuilder
      .limit(limit)
      .offset(page * limit)
      .getManyAndCount();

    return this.createPaginationObject<T>(items, total, limit);
  }

  private createPaginationObject<T>(items: T[], total: number, limit: number) {
    return new Pagination(items, items.length, total, Math.ceil(total / limit));
  }

  private resolveOptions(options: IPaginationOptions): [number, number] {
    const page = options.page > 0 ? options.page - 1 : options.page < 0 ? 0 : options.page;
    const limit = options.limit || 20;

    return [ page, limit ];
  }
}
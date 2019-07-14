import { EntityRepository } from "typeorm";
import { UserEntity } from "../../entities/user.entity";
import { BaseRepository } from "../../shared/base/repository";


@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {

  public createModel(): UserEntity {
    return new UserEntity();
  }
}
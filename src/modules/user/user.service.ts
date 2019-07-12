import { Injectable }               from '@nestjs/common';
import { InjectRepository }         from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { validate }                 from 'class-validator';

import { CreateUserDto } from './dto/create-user';
import { UserEntity } from '../../entities/user.entity';
import { CustomException } from '../../shared/models/custom-exception';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  public async findAll() {
    return await this.userRepository.find();
  }

  public async create(createUserDto: CreateUserDto) {

    const existUser = await this.userRepository.findOne({ username: createUserDto.username });
    if (existUser) {
      throw new CustomException('Username must be unique.');
    }

    let newUser = new UserEntity();
    newUser.username = createUserDto.username;
    newUser.email = createUserDto.email;
    newUser.password = createUserDto.password;

    const errors = await validate(newUser);
    if (errors.length > 0) {
      throw new CustomException(this.buildError(errors));
    } else {
      const savedUser = await this.userRepository.save(newUser);
      return savedUser;
    }
  }

  private buildError(errors) {
    const result = [];
    errors.forEach(el => {
      Object.entries(el.constraints).forEach(constraint => {
        result.push(constraint[1]);
      });
    });
    return result.join(', ');
  }

  public async delete(id: number) {
    const res = await this.userRepository.delete(id);
    if (res.affected) {
      return true;
    } else {
      throw new CustomException('User not found');
    }
  }
}

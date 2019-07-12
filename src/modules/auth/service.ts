import { Injectable }       from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }       from 'typeorm';

import * as jwt    from 'jsonwebtoken';
import * as crypto from 'crypto';

import { UserEntity } from '../../entities/user.entity';
import { SECRET } from '../../shared/helpers/config';
import { LoginUserDto } from './dto/login-user.dto';
import { CustomException } from '../../shared/models/custom-exception';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async generateJWT(loginUserDto: LoginUserDto) {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    const findOneOptions = {
      username : loginUserDto.username,
      password : crypto.createHmac('sha256', loginUserDto.password).digest('hex'),
    };

    const user =  await this.userRepository.findOne(findOneOptions);
    if (!user) throw new CustomException('Username or password is incrorrect');

    const token = jwt.sign({
      id       : user.id,
      username : user.username,
      email    : user.email,
      exp      : exp.getTime() / 1000,
    }, SECRET);

    return { token };
  };
}

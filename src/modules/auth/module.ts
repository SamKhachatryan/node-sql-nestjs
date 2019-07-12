import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './controller';
import { AuthService } from './service';
import { UserEntity } from '../../entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ UserEntity ]),
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    AuthService,
  ],
  exports: [
    AuthService,
  ],
})
export class AuthModule {}

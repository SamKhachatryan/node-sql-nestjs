import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './controller';
import { UserService } from './service';
import { UserRepository } from './repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ UserRepository ]),
  ],
  controllers: [
    UserController,
  ],
  providers: [
    UserService,
  ],
  exports: [
    UserService,
  ],
})
export class UserModule {}

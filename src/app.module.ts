import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';

import { RolesGuard } from './shared/guards/role';

import { UserModule } from './modules/user/user.module';

import { ResponseInterceptor } from './shared/interceptors/response';
import { ErrorsInterceptor } from './shared/interceptors/error';
import { AuthModule } from './modules/auth/module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    AuthModule,
  ],
  controllers: [
    AppController
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
  ]
})
export class ApplicationModule {}

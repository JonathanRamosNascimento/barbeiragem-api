import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthTokenMiddleware } from 'src/middleares/login/auth-token.middleware';
import { AddressModule } from 'src/modules/address/address.module';
import { AddressService } from 'src/modules/address/address.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AddressModule],
  providers: [UserService, AddressService],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthTokenMiddleware)
      .forRoutes(
        { method: RequestMethod.GET, path: 'user' },
        { method: RequestMethod.GET, path: 'user/*' },
        { method: RequestMethod.DELETE, path: 'user' },
      );
  }
}

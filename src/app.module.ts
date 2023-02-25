import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from './database/database';
import { AddressController } from './modules/address/address.controller';
import { AddressModule } from './modules/address/address.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    UserModule,
    AddressModule,
    AuthModule,
  ],
  controllers: [AppController, AddressController],
  providers: [AppService],
})
export class AppModule {}

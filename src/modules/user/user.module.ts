import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from 'src/modules/address/address.module';
import { AddressService } from 'src/modules/address/address.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AddressModule],
  providers: [UserService, AddressService],
  controllers: [UserController],
  exports: [TypeOrmModule],
})
export class UserModule {}

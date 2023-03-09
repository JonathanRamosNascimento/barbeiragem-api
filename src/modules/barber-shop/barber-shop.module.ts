import { Module } from '@nestjs/common';
import { BarberShopService } from './barber-shop.service';
import { BarberShopController } from './barber-shop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarberShop } from './barber-shop.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([BarberShop]), UserModule],
  controllers: [BarberShopController],
  providers: [BarberShopService],
  exports: [TypeOrmModule],
})
export class BarberShopModule {}

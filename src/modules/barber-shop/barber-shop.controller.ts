import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { BarberShop } from './barber-shop.entity';
import { BarberShopService } from './barber-shop.service';

@Controller('barber-shop')
export class BarberShopController {
  constructor(private readonly barberShopService: BarberShopService) {}

  @Post()
  create(@Body() createBarberShop: BarberShop) {
    return this.barberShopService.create(createBarberShop);
  }

  @Get()
  findAll() {
    return this.barberShopService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.barberShopService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBarberShop: BarberShop) {
    return this.barberShopService.update(updateBarberShop);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.barberShopService.remove(id);
  }
}

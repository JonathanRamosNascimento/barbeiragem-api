import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BarberShop } from './barber-shop.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class BarberShopService {
  constructor(
    @InjectRepository(BarberShop)
    private barberShopRepository: Repository<BarberShop>,
    private userService: UserService,
  ) {}

  async create(barberShop: BarberShop): Promise<BarberShop> {
    const bs = this.barberShopRepository.create(barberShop);

    bs.barbers = await Promise.all(
      bs.barbers.map(async (barber) => {
        barber = await this.userService.findOne(barber.id);
        return barber;
      }),
    );

    return this.barberShopRepository.save(bs);
  }

  findAll() {
    return this.barberShopRepository.find({
      relations: { address: true, barbers: true },
    });
  }

  findOne(id: number) {
    return this.barberShopRepository.findOne({ where: { id } });
  }

  async update(barberShopUpdate: BarberShop): Promise<BarberShop> {
    const barberShop = await this.barberShopRepository.findOne({
      where: { id: barberShopUpdate.id },
    });

    if (!barberShop) {
      throw new HttpException('Barber shop not found!', HttpStatus.NOT_FOUND);
    }

    const response = await this.barberShopRepository.save(barberShopUpdate);

    return response;
  }

  remove(id: number) {
    return `This action removes a #${id} barberShop`;
  }
}

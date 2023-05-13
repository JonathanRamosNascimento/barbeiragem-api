import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Address } from '../modules/address/address.entity';
import { User } from '../modules/user/user.entity';
import { BarberShop } from '../modules/barber-shop/barber-shop.entity';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'docker',
  password: 'docker',
  database: 'barbeiragem',
  entities: [User, Address, BarberShop],
  synchronize: true,
  migrations: [`${__dirname}/migrations/*.ts`],
};

export default config;

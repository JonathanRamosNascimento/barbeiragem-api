import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Address } from '../modules/address/address.entity';
import { User } from '../modules/user/user.entity';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'barbeiragem',
  entities: [User, Address],
  synchronize: true,
  migrations: [`${__dirname}/migrations/*.ts`],
};

export default config;

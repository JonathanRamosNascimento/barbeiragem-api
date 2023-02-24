import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressService } from 'src/modules/address/address.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';

import { hash } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private addressService: AddressService,
  ) {}

  public async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  public async findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  public async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  public async create(user: User): Promise<User> {
    user.password = await hash(user.password, 8);

    const address = await this.addressService.create(user.address);
    user.address = address;

    const objectUser = this.usersRepository.create(user);
    const newUser = await this.usersRepository.save(objectUser);

    newUser.password = undefined;
    return newUser;
  }

  public async findWithAddress(): Promise<User[]> {
    const users = await this.usersRepository.find({
      relations: ['address'],
    });
    return users;
  }
}

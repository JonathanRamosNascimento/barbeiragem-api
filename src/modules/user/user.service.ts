import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressService } from 'src/modules/address/address.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';

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
    const address = await this.addressService.create(user.address);
    user.address = address;
    const objectUser = this.usersRepository.create(user);
    return await this.usersRepository.save(objectUser);
  }

  public async findWithAddress(): Promise<User[]> {
    const users = await this.usersRepository.find({
      relations: ['address'],
    });
    return users;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async create(address: Address): Promise<Address> {
    const objectAddress = this.addressRepository.create(address);
    return await this.addressRepository.save(objectAddress);
  }
}

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import authenticationSettings from 'src/authenticationSettings';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async login(props: {
    email: string;
    password: string;
  }): Promise<{ user: User; token: string }> {
    const user = await this.usersRepository.findOne({
      where: { email: props.email },
      select: ['email', 'id', 'isActive', 'name', 'password', 'phone', 'role'],
      relations: ['address'],
    });

    if (!user) {
      throw new InternalServerErrorException(
        'Incorrect email/password combination!',
      );
    }

    if (!user.isActive) {
      throw new InternalServerErrorException(
        'User is disabled, contact support for more information!',
      );
    }

    const passwordMatched = await compare(props.password, user.password);

    user.password = undefined;

    if (!passwordMatched) {
      throw new InternalServerErrorException(
        'Incorrect email/password combination!',
      );
    }

    const { secret, expiresIn } = authenticationSettings.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return { user, token };
  }
}

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
      throw new HttpException(
        'Incorrect email/password combination!',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!user.isActive) {
      throw new HttpException(
        'User is disabled, contact support for more information!',
        HttpStatus.NOT_FOUND,
      );
    }

    const passwordMatched = await compare(props.password, user.password);

    user.password = undefined;

    if (!passwordMatched) {
      throw new HttpException(
        'Incorrect email/password combination!',
        HttpStatus.BAD_REQUEST,
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

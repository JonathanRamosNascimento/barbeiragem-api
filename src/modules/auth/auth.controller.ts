import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async create(
    @Body() props: { email: string; password: string },
  ): Promise<{ user: User; token: string }> {
    return this.authService.login({
      email: props.email,
      password: props.password,
    });
  }
}

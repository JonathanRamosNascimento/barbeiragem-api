import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(
    @Body() props: { email: string; password: string },
  ): Promise<{ user: User; token: string }> {
    return this.authService.login({
      email: props.email,
      password: props.password,
    });
  }
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Get()
  public async findAll(): Promise<User[]> {
    return this.userService.findWithAddress();
  }

  @Get(':id')
  public async show(@Param() params): Promise<User> {
    return this.userService.findOne(Number(params.id));
  }
}

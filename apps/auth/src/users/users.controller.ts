import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { createUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { CurrentUser } from '../../../../libs/common/src/decorators/current-user.decorator';
import { UserDocument } from './models/users.schema';
import { JWTAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async createUser(@Body() createUserdto: createUserDTO) {
    return this.usersService.create(createUserdto);
  }

  @Get()
  @UseGuards(JWTAuthGuard)
  async getUser(@CurrentUser() user: UserDocument) {
    return user;
  }
}

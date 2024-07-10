import { Body, Controller, Post } from '@nestjs/common';
import { createUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService : UsersService){}
    @Post()
    async createUser(@Body() createUserdto :createUserDTO){
        return this.usersService.create(createUserdto)
    }
}

import { Injectable } from '@nestjs/common';
import { createUserDTO } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor (private readonly usersRepository :UsersRepository){}


    async create(createUserDTO :createUserDTO){
        return this.usersRepository.create(createUserDTO)
    }
}

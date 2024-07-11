import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { createUserDTO } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs' 
import { GetUserDTO } from './dto/get-user.dto';

@Injectable()
export class UsersService {
    constructor (private readonly usersRepository :UsersRepository){}
 
    async create(createUserDTO :createUserDTO){

        await this.validateCreateUserDTO(createUserDTO);

        return this.usersRepository.create({
            ...createUserDTO , 
            password : await bcrypt.hash(createUserDTO.password,10)
        })
    }

    private async validateCreateUserDTO(createUserDTO : createUserDTO) {
        try{
            await this.usersRepository.findOne({email :createUserDTO.email})
        }
        catch(err){
            return;
        }

        throw new UnprocessableEntityException('Email Already Exists !');
    }


    async verifyUser(email: string , password:string){
        const user = await this.usersRepository.findOne({email})
        const passwordIsValid = await bcrypt.compare(password,user.password)

        if (!passwordIsValid){
            throw new UnauthorizedException('Invalid Credentials')
        }
        return user;
    }

    async getUser(getUserDTO : GetUserDTO){
        return this.usersRepository.findOne(getUserDTO);
    }
}

import { Injectable } from '@nestjs/common';
import { UserDocument } from './users/models/users.schema';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayLoad } from './interfaces/tokenPayload.interface';

@Injectable()
export class AuthService {

    constructor ( private readonly configService : ConfigService,private readonly jwtservice : JwtService){}

    async login(user : UserDocument , response : Response){

        const tokenpayload: TokenPayLoad = { 
            userId : user._id.toHexString()
        }

        const expires = new Date()
        expires.setSeconds(expires.getSeconds()+ this.configService.get('JWT_EXPIRATION'))

        const token = this.jwtservice.sign(tokenpayload)

        response.cookie('Authentication',token,{httpOnly:true,expires})
    }
    
}


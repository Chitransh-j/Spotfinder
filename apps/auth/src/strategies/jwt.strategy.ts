import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { TokenPayLoad } from '../interfaces/tokenPayload.interface';

@Injectable()
export class JWTstrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) =>{
          const token = request?.cookies?.Authentication;
          // console.log('JWT Token:', token);
          return token;
        } 
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate({ userId }: TokenPayLoad) {
    // console.log('User ID from payload:', userId);
    const user = await this.usersService.getUser({ _id: userId });
    // console.log('Retrieved user:', user);
    return user;
  }
  
}
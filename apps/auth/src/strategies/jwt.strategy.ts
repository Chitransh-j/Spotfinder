import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
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
        (request: any) =>{
          ///parsing request via RPC call or via Cookie
          const token = request?.cookies?.Authentication || request?.Authentication   
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
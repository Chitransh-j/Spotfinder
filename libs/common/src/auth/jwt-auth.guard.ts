import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { catchError, map, Observable, of, tap } from "rxjs";
import { AUTH_SERVICE } from "../constants/services";
import { ClientProxy } from "@nestjs/microservices";
import { userDTO } from "../dto";

@Injectable()
export class JWTAuthGuard implements CanActivate{

    constructor (@Inject(AUTH_SERVICE) private readonly authClient : ClientProxy){}


    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const jwt =context.switchToHttp().getRequest().cookies?.Authentication;

        if (!jwt)return false; 

        return this.authClient.send<userDTO>('authenticate',{
            Authentication :jwt
        }).pipe(
            tap((res)=> {
                context.switchToHttp().getRequest().user = res
            }),
            map(()=>true),
            catchError(()=>of(false))
        )
    }
}   
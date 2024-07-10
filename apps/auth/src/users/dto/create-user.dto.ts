import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class createUserDTO{
    @IsEmail() @IsNotEmpty()
    email: string;
    
    @IsStrongPassword() @IsNotEmpty()
    password:string;
}
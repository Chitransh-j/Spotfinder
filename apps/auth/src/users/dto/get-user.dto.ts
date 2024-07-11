import { IsNotEmpty, IsString } from "class-validator";

export class GetUserDTO{
    @IsString()
    @IsNotEmpty()
    _id : string;
}
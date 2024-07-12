import { cardDTO } from "@app/common/dto/card.dto"
import { Type } from "class-transformer";
import { IsDefined, IsNotEmptyObject, IsNumber, ValidateNested } from "class-validator";

export class createChargeDTO{
    @IsDefined() 
    @IsNotEmptyObject() 
    @ValidateNested() 
    @Type(()=> cardDTO)
    card  : cardDTO;

    @IsNumber()
    amount : Number
}
import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({versionKey:false})
export class UserDocument extends AbstractDocument {
    @Prop()
    email:string;

    @Prop()
    password:string;

}

//creates class for the above schema 
export const Userschema = SchemaFactory.createForClass(UserDocument)
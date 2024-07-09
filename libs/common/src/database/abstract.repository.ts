import { FilterQuery, Model, Types, UpdateQuery } from "mongoose";
import { AbstractDocument } from "./abstract.schema";
import { Logger, NotFoundException } from "@nestjs/common";

export abstract class AbstractRepository <TDocument extends AbstractDocument>{

    protected abstract readonly logger: Logger;
    constructor(protected readonly model : Model<TDocument>){}
    

    /////////  THIS IS THE BOILER PLATE CODE FOR ALL THE CRUD OPERATIONS IN OUR MICROSERVICES   ////////////


    // NOTE := try keeping everything as generic as possible to reuse and avoid code getting repeated

    async create(document: Omit <TDocument,'_id'> ): Promise<TDocument>
    {
         const createdDocument = new this.model({
            ...document,
            _id :new Types.ObjectId()
         })

         return (await createdDocument.save()).toJSON() as unknown as TDocument
    }


    async findOne(filterquery : FilterQuery<TDocument> ) : Promise <TDocument>
    {
        const document = await this.model.findOne(filterquery).lean<TDocument>(true)

        if (!document){
            this.logger.warn("document was not found with query",filterquery);
            throw new NotFoundException("Document was not found");
        }

        return document;
    }

    async findOneandUpdate(filterquery : FilterQuery<TDocument>,update : UpdateQuery <TDocument>) : Promise <TDocument>
    {
        const document = await this.model.findOneAndUpdate(filterquery,update,{new:true}).lean<TDocument>(true)
        
        if (!document){
            this.logger.warn("document was not found with query",filterquery);
            throw new NotFoundException("Document was not found");
        }

        return document;
    }


    async find(filterquery : FilterQuery<TDocument> ) : Promise <TDocument[]>
    {
        return this.model.find(filterquery).lean<TDocument[]>(true) 
    }

    async findOneandDelete(filterquery: FilterQuery<TDocument>) : Promise <TDocument>
    {
        return this.model.findOneAndDelete(filterquery).lean<TDocument>(true)
    }

}   
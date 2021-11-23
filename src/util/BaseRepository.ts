import { NotFoundException } from "@nestjs/common";
import { NotFoundError } from "rxjs";

export class BaseRepository{ 
    constructor(private model: any, private modelName: string) {
    }
    async findAll(whereQlause?, attributes?): Promise<any>{  
        return await this.model.findAll({where: whereQlause, attributes});       
    } 

    async findOne(whereQlause?, attributes?): Promise<any>{ 
        const result =  await this.model.findOne({where: whereQlause , attributes})
        if(!result) { 
            throw new NotFoundException(`${this.modelName} Not Found`); 
        } 
        return result; 
    }  

    async create(data): Promise<any>{ 
        data.id = Date.now().toString(); 
        return await this.model.create(data); 
    } 

    async updateOne(id: string, data): Promise<any>{
    const modelFound = await this.findOne({id: id});  
    if(!modelFound) { 
        throw new NotFoundException(`${this.modelName} Not Found`); 
    }
        return await modelFound.update(data); 
    } 

    async delete(id: string): Promise<any>{
        return await this.model.destroy({where:{id: id}}); 
    } 

    async count(whereQlause): Promise<any>{ 
        return await this.model.count({where: whereQlause}); 
    }  
}
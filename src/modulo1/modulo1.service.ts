import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Modulo1Entity } from './modulo1.entity/modulo1.entity';
import { Repository } from 'typeorm';

@Injectable()
export class Modulo1Service {
    constructor(
        @InjectRepository(Modulo1Entity)
        private readonly modulo1Repository: Repository<Modulo1Entity>
    ){}
    async findAll(): Promise<Modulo1Entity[]> {
        return await this.modulo1Repository.find({ relations: ["modulo2", "fotos"] });
    }
    async findOne(id: string): Promise<Modulo1Entity> {
        const modulo1: Modulo1Entity = await this.modulo1Repository.findOne({where: {id}, relations: ["modulo2", "fotos"] } );
        if (!modulo1)
          throw new BusinessLogicException("The Modulo1 with the given id was not found", BusinessError.NOT_FOUND);
   
        return modulo1;
    }
    async create(modulo1: Modulo1Entity): Promise<Modulo1Entity> {
        return await this.modulo1Repository.save(modulo1);
    }
}

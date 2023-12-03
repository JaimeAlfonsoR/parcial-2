import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Modulo2Entity } from './modulo2.entity';
import { Repository } from 'typeorm/repository/Repository';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class Modulo2Service {

    constructor(
        @InjectRepository(Modulo2Entity)
        private readonly modulo2Repository: Repository<Modulo2Entity>
    ){}

    async create(modulo2: Modulo2Entity): Promise<Modulo2Entity> {
        if (modulo2.slogan.length<20){
            throw new BusinessLogicException("The Slogan of the red is too short, it would be 20 characters",BusinessError.PRECONDITION_FAILED);

        }
        return await this.modulo2Repository.save(modulo2);
    }
}

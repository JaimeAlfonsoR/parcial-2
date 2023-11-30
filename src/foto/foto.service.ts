import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FotoEntity } from './foto.entity/foto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FotoService {
    constructor(
        @InjectRepository(FotoEntity)
        private readonly fotoRepository: Repository<FotoEntity>
    ){}
    async findAll(): Promise<FotoEntity[]> {
        return await this.fotoRepository.find({ relations: ["modulo2", "modulo3"] });
    }
    async findOne(id: string): Promise<FotoEntity> {
        const foto: FotoEntity = await this.fotoRepository.findOne({where: {id}, relations: ["modulo2", "modulo3"] } );
        if (!foto)
          throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);
   
        return foto;
    }
    async create(foto: FotoEntity): Promise<FotoEntity> {
        return await this.fotoRepository.save(foto);
    }
    async delete(id: string) {
        const foto: FotoEntity = await this.fotoRepository.findOne({where:{id}});
        if (!foto)
          throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);
     
        await this.fotoRepository.remove(foto);
    }

}

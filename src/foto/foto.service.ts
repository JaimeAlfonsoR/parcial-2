import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FotoEntity } from './foto.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Modulo3Entity } from '../modulo3/modulo3.entity';

@Injectable()
export class FotoService {
    constructor(
        @InjectRepository(FotoEntity)
        private readonly fotoRepository: Repository<FotoEntity>,
        @InjectRepository(Modulo3Entity)
        private readonly modulo3Repository: Repository<Modulo3Entity>
    ){}
    async findAll(): Promise<FotoEntity[]> {
        return await this.fotoRepository.find({ relations: ["modulo1", "modulo3"] });
    }
    async findOne(id: string): Promise<FotoEntity> {
        const foto: FotoEntity = await this.fotoRepository.findOne({where: {id}, relations: ["modulo1", "modulo3"] } );
        if (!foto)
          throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);
   
        return foto;
    }
    async create(foto: FotoEntity): Promise<FotoEntity> {
        if (foto.ISO<100 || foto.ISO>6400)
          throw new BusinessLogicException("The ISO of the foto dont have the requirements", BusinessError.PRECONDITION_FAILED);
        if (foto.velObturacion<2 || foto.velObturacion>250)
          throw new BusinessLogicException("The vol of obturacion of the foto dont have the requirements", BusinessError.PRECONDITION_FAILED);
        if (foto.apertura<1 || foto.apertura>32)
          throw new BusinessLogicException("The ISO of the foto dont have the requirements", BusinessError.PRECONDITION_FAILED);
        if (foto.apertura>16 && foto.ISO>3250 && foto.velObturacion>126)
          throw new BusinessLogicException("The foto dont have the requirements", BusinessError.PRECONDITION_FAILED);
        return await this.fotoRepository.save(foto);
    }
    async delete(id: string) {
        const foto: FotoEntity = await this.fotoRepository.findOne({where:{id}});
        if (!foto)
          throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);
        const album=foto.modulo3;
     
        await this.fotoRepository.remove(foto);
        if (album !=null){
            if(album.fotos==null){await this.modulo3Repository.delete(album.id)}
        }
    }

}

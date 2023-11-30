import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Modulo3Entity } from './modulo3.entity/modulo3.entity';
import { FotoEntity } from 'src/foto/foto.entity/foto.entity';

@Injectable()
export class Modulo3Service {
    constructor(
        @InjectRepository(Modulo3Entity)
        private readonly modulo3Repository: Repository<Modulo3Entity>,

        @InjectRepository(FotoEntity)
        private readonly fotoRepository: Repository<FotoEntity>
    ){}
    async create(modulo3: Modulo3Entity): Promise<Modulo3Entity> {
        return await this.modulo3Repository.save(modulo3);
    }
    async findOne(id: string): Promise<Modulo3Entity> {
        const modulo3: Modulo3Entity = await this.modulo3Repository.findOne({where: {id}, relations: ["fotos"] } );
        if (!modulo3)
          throw new BusinessLogicException("The Modulo3 with the given id was not found", BusinessError.NOT_FOUND);
   
        return modulo3;
    }
    async delete(id: string) {
        const modulo3: Modulo3Entity = await this.modulo3Repository.findOne({where:{id}});
        if (!modulo3)
          throw new BusinessLogicException("The Modulo3 with the given id was not found", BusinessError.NOT_FOUND);
     
        await this.modulo3Repository.remove(modulo3);
    }
    async addfotoModulo3(modulo3Id: string, fotoId: string): Promise<Modulo3Entity> {
        const foto: FotoEntity = await this.fotoRepository.findOne({where: {id: fotoId}, relations:[]});
        if (!foto)
          throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);
      
        const modulo3: Modulo3Entity = await this.modulo3Repository.findOne({where: {id: modulo3Id}, relations: ["fotos"]})
        if (!modulo3)
          throw new BusinessLogicException("The Modulo3 with the given id was not found", BusinessError.NOT_FOUND);
    
        modulo3.fotos = [...modulo3.fotos, foto];
        return await this.modulo3Repository.save(modulo3);
      }

}

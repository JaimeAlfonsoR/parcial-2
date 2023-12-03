import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Modulo3Entity } from './modulo3.entity';
import { FotoEntity } from '../foto/foto.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class Modulo3Service {
    constructor(
        @InjectRepository(Modulo3Entity)
        private readonly modulo3Repository: Repository<Modulo3Entity>,

        @InjectRepository(FotoEntity)
        private readonly fotoRepository: Repository<FotoEntity>
    ){}
    async create(modulo3: Modulo3Entity): Promise<Modulo3Entity> {
      if (modulo3.titulo.length==0){
        throw new BusinessLogicException("El album tiene que tener un titulo", BusinessError.PRECONDITION_FAILED);
      }
        return await this.modulo3Repository.save(modulo3);
    }
    async findOne(id: string): Promise<Modulo3Entity> {
        const modulo3: Modulo3Entity = await this.modulo3Repository.findOne({where: {id}, relations: ["fotos"] } );
        if (!modulo3)
          throw new BusinessLogicException("The Album with the given id was not found", BusinessError.NOT_FOUND);
   
        return modulo3;
    }
    async delete(id: string) {
        const modulo3: Modulo3Entity = await this.modulo3Repository.findOne({where:{id}});
        if (!modulo3)
          throw new BusinessLogicException("The Album with the given id was not found", BusinessError.NOT_FOUND);
        if (modulo3.fotos!=null){
          throw new BusinessLogicException("No se puede eliminar un album si tiene alguna foto asignada", BusinessError.PRECONDITION_FAILED);
        }
     
        await this.modulo3Repository.remove(modulo3);
    }
    async addfotoModulo3(modulo3Id: string, fotoId: string): Promise<Modulo3Entity> {
        const foto: FotoEntity = await this.fotoRepository.findOne({where: {id: fotoId}, relations:[]});
  
        if (!foto)
          throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);
      
        const modulo3: Modulo3Entity = await this.modulo3Repository.findOne({where: {id: modulo3Id}, relations: ["fotos"]})
        if (!modulo3)
          throw new BusinessLogicException("The Album with the given id was not found", BusinessError.NOT_FOUND);
        if (foto.fecha<modulo3.fechaInicio){
          throw new BusinessLogicException("La fecha de la foto no puede ser menor a la fecha de inicio del album", BusinessError.PRECONDITION_FAILED);
        }
        if (foto.fecha>modulo3.fechaFin){
          throw new BusinessLogicException("La fecha de la foto no puede ser mayor a la fecha de fin del album", BusinessError.PRECONDITION_FAILED);
        }
    
        modulo3.fotos = [...modulo3.fotos, foto];
        return await this.modulo3Repository.save(modulo3);
      }

}

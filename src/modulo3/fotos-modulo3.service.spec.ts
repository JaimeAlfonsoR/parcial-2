/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { FotoEntity } from '../foto/foto.entity';
import { Repository } from 'typeorm';
import { Modulo3Entity } from '../modulo3/modulo3.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Modulo3Service } from './modulo3.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('Modulo3Service', () => {
  let service: Modulo3Service;
  let modulo3Repository: Repository<Modulo3Entity>;
  let fotoRepository: Repository<FotoEntity>;
  let modulo3: Modulo3Entity;
  let fotosList : FotoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [Modulo3Service],
    }).compile();

    service = module.get<Modulo3Service>(Modulo3Service);
    modulo3Repository = module.get<Repository<Modulo3Entity>>(getRepositoryToken(Modulo3Entity));
    fotoRepository = module.get<Repository<FotoEntity>>(getRepositoryToken(FotoEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    fotoRepository.clear();
    modulo3Repository.clear();

    fotosList = [];
    for(let i = 0; i < 5; i++){
        const foto: FotoEntity = await fotoRepository.save({
            fecha: faker.date.past(),
            ISO: faker.number.int(),
            velObturacion: faker.number.int(),
            apertura: faker.number.int()
        })
        fotosList.push(foto);
    }

    modulo3 = await modulo3Repository.save({
      fechaInicio: faker.date.past(),
      fechaFin: faker.date.future(),
      titulo: faker.music.songName(),
      fotos: fotosList
    })
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addfotoModulo3 should add an foto to a Album', async () => {
    const newFoto: FotoEntity = await fotoRepository.save({
        fecha: faker.date.past(),
        ISO: faker.number.int(),
        velObturacion: faker.number.int(),
        apertura: faker.number.int()
    });

    const newModulo3: Modulo3Entity = await modulo3Repository.save({
        fechaInicio: faker.date.past(),
        fechaFin: faker.date.future(),
        titulo: faker.music.songName()
    })

    const result: Modulo3Entity = await service.addfotoModulo3(newModulo3.id, newFoto.id);
    
    expect(result.fotos.length).toBe(1);
    expect(result.fotos[0]).not.toBeNull();
    expect(result.fotos[0].fecha).toStrictEqual(newFoto.fecha)
    expect(result.fotos[0].ISO).toBe(newFoto.ISO)
    expect(result.fotos[0].velObturacion).toBe(newFoto.velObturacion)
    expect(result.fotos[0].apertura).toBe(newFoto.apertura)
  });

  it('addfotoModulo3 should thrown exception for an invalid foto', async () => {
    const newModulo3: Modulo3Entity = await modulo3Repository.save({
        fechaInicio: faker.date.past(),
        fechaFin: faker.date.future(),
        titulo: faker.music.songName()
    })

    await expect(() => service.addfotoModulo3(newModulo3.id, "0")).rejects.toHaveProperty("message", "The foto with the given id was not found");
  });

  it('addfotoModulo3 should throw an exception for an invalid Album', async () => {
    const newFoto: FotoEntity = await fotoRepository.save({
        fecha: faker.date.past(),
        ISO: faker.number.int(),
        velObturacion: faker.number.int(),
        apertura: faker.number.int()
    });

    await expect(() => service.addfotoModulo3("0", newFoto.id)).rejects.toHaveProperty("message", "The Album with the given id was not found");
  });

 

});
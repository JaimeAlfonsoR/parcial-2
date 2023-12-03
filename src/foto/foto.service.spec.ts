import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Any, Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { FotoService } from './foto.service';
import { FotoEntity } from './foto.entity';
import { faker } from '@faker-js/faker';

describe('FotoService', () => {
  let service: FotoService;
  let repository: Repository<FotoEntity>;
  let fotosList = [];

  const seedDatabase = async () => {
    repository.clear();
    fotosList = [];
    for (let i = 0; i < 5; i++) {
      const foto: FotoEntity = await repository.save({
        fecha: faker.date.past(),
        ISO: faker.number.int({min:100, max:6400}),
        velObturacion: faker.number.int({min:2, max:126}),
        apertura: faker.number.int({min:1, max:32})
      })
      fotosList.push(foto);
    }
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [FotoService],
    }).compile();
 
    service = module.get<FotoService>(FotoService);
    repository = module.get<Repository<FotoEntity>>(getRepositoryToken(FotoEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('create should return a new Foto', async () => {
    const foto: FotoEntity = {
      id: "",
      fecha: faker.date.past(),
      ISO: faker.number.int({min:100, max:6400}),
      velObturacion: faker.number.int({min:2, max:126}),
      apertura: faker.number.int({min:1, max:32}),
      modulo3:null,
      modulo1:null
    }

    const newFoto: FotoEntity = await service.create(foto);
    expect(newFoto).not.toBeNull();

    const storedFoto: FotoEntity = await repository.findOne({ where: { id: newFoto.id } })
    expect(storedFoto).not.toBeNull();
    expect(storedFoto.fecha).toEqual(newFoto.fecha)
    expect(storedFoto.ISO).toEqual(newFoto.ISO)
    expect(storedFoto.velObturacion).toEqual(newFoto.velObturacion)
    expect(storedFoto.apertura).toEqual(newFoto.apertura)
  });
  it('delete should remove a Foto', async () => {
    const foto: FotoEntity = fotosList[0];
    await service.delete(foto.id);
     const deletedFoto: FotoEntity = await repository.findOne({ where: { id: foto.id } })
    expect(deletedFoto).toBeNull();
  });
  it('findAll should return all fotos', async () => {
    const fotos: FotoEntity[] = await service.findAll();
    expect(fotos).not.toBeNull();
    expect(fotos).toHaveLength(fotosList.length);
  });
  it('findOne should return a foto by id', async () => {
    const storedFoto: FotoEntity = fotosList[0];
    const foto: FotoEntity = await service.findOne(storedFoto.id);
    expect(foto).not.toBeNull();
    expect(foto.fecha).toEqual(storedFoto.fecha)
    expect(foto.ISO).toEqual(storedFoto.ISO)
    expect(foto.velObturacion).toEqual(storedFoto.velObturacion)
    expect(foto.apertura).toEqual(storedFoto.apertura)
  });
  it('findOne should throw an exception for an invalid foto', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The foto with the given id was not found")
  });
  it('delete should throw an exception for an invalid foto', async () => {
    const foto: FotoEntity = fotosList[0];
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "The foto with the given id was not found")
  });

});

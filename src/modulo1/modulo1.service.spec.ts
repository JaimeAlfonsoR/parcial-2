import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Modulo1Service} from './Modulo1.service';
import { Modulo1Entity } from './modulo1.entity';
import { faker } from '@faker-js/faker';

describe('Modulo1Service', () => {
  let service: Modulo1Service;
  let repository: Repository<Modulo1Entity>;
  let modulo1sList = [];

  const seedDatabase = async () => {
    repository.clear();
    modulo1sList = [];
    for (let i = 0; i < 5; i++) {
      const modulo1: Modulo1Entity = await repository.save({
        nombre: faker.person.fullName(),
        telefono: "1234567890",
      })
      modulo1sList.push(modulo1);
    }
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [Modulo1Service],
    }).compile();
 
    service = module.get<Modulo1Service>(Modulo1Service);
    repository = module.get<Repository<Modulo1Entity>>(getRepositoryToken(Modulo1Entity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('create should return a new Usuario', async () => {
    
    const modulo1: Modulo1Entity = {
      id: "",
      nombre: faker.person.fullName(),
      telefono: "1234567890",
      modulo2:null,
      fotos:[]
    }

    const newModulo1: Modulo1Entity = await service.create(modulo1);
    expect(newModulo1).not.toBeNull();

    const storedModulo1: Modulo1Entity = await repository.findOne({ where: { id: newModulo1.id } })
    expect(storedModulo1).not.toBeNull();
    expect(storedModulo1.nombre).toEqual(newModulo1.nombre)
    expect(storedModulo1.telefono).toEqual(newModulo1.telefono)
  });
  it('findAll should return all Usuarios', async () => {
    const modulo1s: Modulo1Entity[] = await service.findAll();
    expect(modulo1s).not.toBeNull();
    expect(modulo1s).toHaveLength(modulo1sList.length);
  });
  it('findOne should return a Usuario by id', async () => {
    const storedModulo1: Modulo1Entity = modulo1sList[0];
    const modulo1: Modulo1Entity = await service.findOne(storedModulo1.id);
    expect(modulo1).not.toBeNull();
    expect(modulo1.nombre).toEqual(storedModulo1.nombre)
    expect(modulo1.telefono).toEqual(storedModulo1.telefono)
  });
  it('findOne should throw an exception for an invalid Usuario', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The Usuario with the given id was not found")
  });

});

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Modulo2Service} from './Modulo2.service';
import { Modulo2Entity } from './modulo2.entity';
import { faker } from '@faker-js/faker';

describe('Modulo2Service', () => {
  let service: Modulo2Service;
  let repository: Repository<Modulo2Entity>;
  let modulo2sList = [];

  const seedDatabase = async () => {
    repository.clear();
    modulo2sList = [];
    for (let i = 0; i < 5; i++) {
      const modulo2: Modulo2Entity = await repository.save({
        nombre: faker.company.name(),
        slogan: faker.lorem.sentences()
      })
      modulo2sList.push(modulo2);
    }
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [Modulo2Service],
    }).compile();
 
    service = module.get<Modulo2Service>(Modulo2Service);
    repository = module.get<Repository<Modulo2Entity>>(getRepositoryToken(Modulo2Entity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('create should return a new Red Social', async () => {
    const modulo2: Modulo2Entity = {
      id: "",
      nombre: faker.company.name(),
      slogan: faker.lorem.sentences(),
      modulo1s:[]
    }

    const newModulo2: Modulo2Entity = await service.create(modulo2);
    expect(newModulo2).not.toBeNull();

    const storedModulo2: Modulo2Entity = await repository.findOne({ where: { id: newModulo2.id } })
    expect(storedModulo2).not.toBeNull();
    expect(storedModulo2.nombre).toEqual(newModulo2.nombre)
    expect(storedModulo2.slogan).toEqual(newModulo2.slogan)
  });
  it('create should throw an exception for an invalid Slogan', async () => {
    const modulo2: Modulo2Entity = {
      id: "",
      nombre: faker.company.name(),
      slogan: faker.lorem.word(),
      modulo1s:[]
    }
    await expect(() => service.create(modulo2)).rejects.toHaveProperty("message","The Slogan of the red is too short, it would be 20 characters")
  })


});

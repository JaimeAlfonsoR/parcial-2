import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Modulo3Service} from './Modulo3.service';
import { Modulo3Entity } from './modulo3.entity';
import { faker } from '@faker-js/faker';

describe('Modulo3Service', () => {
  let service: Modulo3Service;
  let repository: Repository<Modulo3Entity>;
  let modulo3sList = [];

  const seedDatabase = async () => {
    repository.clear();
    modulo3sList = [];
    for (let i = 0; i < 5; i++) {
      const modulo3: Modulo3Entity = await repository.save({
        fechaInicio: faker.date.past(),
        fechaFin: faker.date.future(),
        titulo: faker.music.songName()
      })
      modulo3sList.push(modulo3);
    }
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [Modulo3Service],
    }).compile();
 
    service = module.get<Modulo3Service>(Modulo3Service);
    repository = module.get<Repository<Modulo3Entity>>(getRepositoryToken(Modulo3Entity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('create should return a new Album', async () => {
    const modulo3: Modulo3Entity = {
      id: "",
      fechaInicio: faker.date.past(),
      fechaFin: faker.date.future(),
      titulo: faker.music.songName(),
      fotos:[]
    }

    const newModulo3: Modulo3Entity = await service.create(modulo3);
    expect(newModulo3).not.toBeNull();

    const storedModulo3: Modulo3Entity = await repository.findOne({ where: { id: newModulo3.id } })
    expect(storedModulo3).not.toBeNull();
    expect(storedModulo3.titulo).toEqual(newModulo3.titulo)
    expect(storedModulo3.fechaInicio).toEqual(newModulo3.fechaInicio)
    expect(storedModulo3.fechaFin).toEqual(newModulo3.fechaFin)
  });
  it('findOne should return a Usuario by id', async () => {
    const storedModulo3: Modulo3Entity = modulo3sList[0];
    const modulo3: Modulo3Entity = await service.findOne(storedModulo3.id);
    expect(modulo3).not.toBeNull();
    expect(modulo3.titulo).toEqual(storedModulo3.titulo)
    expect(modulo3.fechaInicio).toEqual(storedModulo3.fechaInicio)
    expect(modulo3.fechaFin).toEqual(storedModulo3.fechaFin)
  });
  it('findOne should throw an exception for an invalid Usuario', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The Album with the given id was not found")
  });
  it('delete should remove a Album', async () => {
    const modulo3: Modulo3Entity = modulo3sList[0];
    await service.delete(modulo3.id);
     const deletedModulo3: Modulo3Entity = await repository.findOne({ where: { id: modulo3.id } })
    expect(deletedModulo3).toBeNull();
  });
  it('delete should throw an exception for an album', async () => {
    const foto: Modulo3Entity = modulo3sList[0];
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "The Album with the given id was not found")
  });

});

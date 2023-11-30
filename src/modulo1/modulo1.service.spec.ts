import { Test, TestingModule } from '@nestjs/testing';
import { Modulo1Service } from './modulo1.service';

describe('Modulo1Service', () => {
  let service: Modulo1Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Modulo1Service],
    }).compile();

    service = module.get<Modulo1Service>(Modulo1Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { Modulo2Service } from './modulo2.service';

describe('Modulo2Service', () => {
  let service: Modulo2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Modulo2Service],
    }).compile();

    service = module.get<Modulo2Service>(Modulo2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { Modulo3Service } from './modulo3.service';

describe('Modulo3Service', () => {
  let service: Modulo3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Modulo3Service],
    }).compile();

    service = module.get<Modulo3Service>(Modulo3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ApuestasService } from './apuestas.service';

describe('ApuestasService', () => {
  let service: ApuestasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApuestasService],
    }).compile();

    service = module.get<ApuestasService>(ApuestasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

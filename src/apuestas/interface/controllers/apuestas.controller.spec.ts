import { Test, TestingModule } from '@nestjs/testing';
import { ApuestasController } from './presentation/controllers/apuestas.controller';

describe('ApuestasController', () => {
  let controller: ApuestasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApuestasController],
    }).compile();

    controller = module.get<ApuestasController>(ApuestasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

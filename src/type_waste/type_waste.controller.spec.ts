import { Test, TestingModule } from '@nestjs/testing';
import { TypeWasteController } from './type_waste.controller';
import { TypeWasteService } from './type_waste.service';

describe('TypeWasteController', () => {
  let controller: TypeWasteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeWasteController],
      providers: [TypeWasteService],
    }).compile();

    controller = module.get<TypeWasteController>(TypeWasteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

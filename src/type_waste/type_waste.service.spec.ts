import { Test, TestingModule } from '@nestjs/testing';
import { TypeWasteService } from './type_waste.service';

describe('TypeWasteService', () => {
  let service: TypeWasteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeWasteService],
    }).compile();

    service = module.get<TypeWasteService>(TypeWasteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

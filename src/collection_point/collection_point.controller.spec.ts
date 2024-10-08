import { Test, TestingModule } from '@nestjs/testing';
import { CollectionPointController } from './collection_point.controller';
import { CollectionPointService } from './collection_point.service';

describe('CollectionPointController', () => {
  let controller: CollectionPointController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollectionPointController],
      providers: [CollectionPointService],
    }).compile();

    controller = module.get<CollectionPointController>(CollectionPointController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Injectable } from '@nestjs/common';
import { CreateCollectionPointDto } from './dto/create-collection_point.dto';
import { UpdateCollectionPointDto } from './dto/update-collection_point.dto';

@Injectable()
export class CollectionPointService {
  create(createCollectionPointDto: CreateCollectionPointDto) {
    return 'This action adds a new collectionPoint';
  }

  findAll() {
    return `This action returns all collectionPoint`;
  }

  findOne(id: number) {
    return `This action returns a #${id} collectionPoint`;
  }

  update(id: number, updateCollectionPointDto: UpdateCollectionPointDto) {
    return `This action updates a #${id} collectionPoint`;
  }

  remove(id: number) {
    return `This action removes a #${id} collectionPoint`;
  }
}

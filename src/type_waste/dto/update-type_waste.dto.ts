import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeWasteDto } from './create-type_waste.dto';

export class UpdateTypeWasteDto extends PartialType(CreateTypeWasteDto) {}

import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateGiftDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNumber()
    @IsNotEmpty()
    companyId: number;
}

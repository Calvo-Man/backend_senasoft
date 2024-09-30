/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCompanyDto {
    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    @IsNumber()
    nit:string
}

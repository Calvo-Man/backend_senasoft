/* eslint-disable prettier/prettier */

import { IsEmail,  IsNotEmpty,  IsNumber,  IsString, MinLength } from "class-validator";
import { Transform } from "class-transformer";


export class RegisterAuthDto {
    @IsString()
    @MinLength(1)
    name: string;
  
    @IsEmail()
    email: string;
    
    @IsString()
    @MinLength(1)
    last_name: string;

    @IsString()
    @MinLength(1)
    mobile: string;
    
    @IsString()
    @MinLength(1)
    @Transform(({ value }) => value.trim())
    password: string;

    @IsNumber()
    @IsNotEmpty()
    rolId: number;
}
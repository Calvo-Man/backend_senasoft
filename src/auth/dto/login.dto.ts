/* eslint-disable prettier/prettier */

import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginAuthDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @MinLength(1)
    @Transform(({ value }) => value.trim())
    password: string;
}
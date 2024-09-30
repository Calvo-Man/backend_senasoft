/* eslint-disable prettier/prettier */
import {  IsString } from "class-validator";

export class CreateRolDto {

    @IsString()
    
    rol_name: string;
}

/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRolDto {

    @IsString()
    @IsNotEmpty()
    rol_name: string;


}

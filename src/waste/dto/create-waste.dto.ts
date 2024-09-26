/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber } from "class-validator"


export class CreateWasteDto {

    @IsNumber({},{message: 'quantity Must be a number'})
    @IsNotEmpty({message: 'quantity is required'})
    quantity:number
    
    @IsNumber({},{message: 'typeWasteId Must be a number'})
    @IsNotEmpty({message: 'typeWasteId is required'})
    typeWasteId:number

    @IsNumber({},{message: 'companyId Must be a number'})
    @IsNotEmpty({message: 'companyId is required'})
    companyId:number

    // @IsNumber({},{message: 'usersId Must be a number'})
    // @IsNotEmpty({message: 'usersId is required'})
    // usersId:number
}

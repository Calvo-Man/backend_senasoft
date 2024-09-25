/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Waste {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column('float')
    price: number;}

/* eslint-disable prettier/prettier */
import { CollectionPoint } from "src/collection_point/entities/collection_point.entity";
import { Gift } from "src/gifts/entities/gift.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Company {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    nit: string;

    @OneToMany(()=>CollectionPoint, (collectionPoint) => collectionPoint.company)   
    collectionPoint: CollectionPoint[]

    @OneToMany(()=> Gift , (gift) => gift.company)
    gift: Gift[]


}

/* eslint-disable prettier/prettier */
import { Company } from "src/company/entities/company.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CollectionPoint {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(() => Company, (company) => company.collectionPoint) 
    company: Company
}

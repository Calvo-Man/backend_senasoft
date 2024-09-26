/* eslint-disable prettier/prettier */
import { Company } from "src/company/entities/company.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Gift {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    price: number

    @ManyToOne(()=> Company, (company) => company.gift)
    company: Company
    
    @ManyToMany(() => User, (user) => user.gifts)
    @JoinTable()
    users: User[]
}

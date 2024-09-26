/* eslint-disable prettier/prettier */
import { Gift } from "src/gifts/entities/gift.entity";
import { Rol } from "src/rol/entities/rol.entity";
import { Training } from "src/training/entities/training.entity";
import { Waste } from "src/waste/entities/waste.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    name: string

    @Column()
    last_name: string

    @Column()
    mobile: string

    @Column()
    password: string

    @Column({ default: 0 })
    points: number

    @ManyToOne(() => Rol, (rol) => rol.user)
    rol: Rol
    
    @OneToMany(()=>Waste, (waste) => waste.users)
    waste: Waste

    @ManyToMany(() => Training, (training) => training.users)
    trainings: Training[]

    @ManyToMany(() => Gift, (gift) => gift.users)
    gifts: Gift[]

}

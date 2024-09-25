/* eslint-disable prettier/prettier */
import { Rol } from "src/rol/entities/rol.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

}

/* eslint-disable prettier/prettier */
import { User } from "src/users/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Rol {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rol_name: string;

    @OneToMany(() => User, (user) => user.rol)
    user: User[]
}

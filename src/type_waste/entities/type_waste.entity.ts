import { Waste } from "src/waste/entities/waste.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TypeWaste {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    points_value: number;

    @OneToMany(() => Waste, (waste) => waste.typeWaste)
    waste: Waste[]
}

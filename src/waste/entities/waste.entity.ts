/* eslint-disable prettier/prettier */
import { TypeWaste } from 'src/type_waste/entities/type_waste.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Waste {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => TypeWaste, (typeWaste) => typeWaste.waste)
  typeWaste: TypeWaste

  @ManyToOne(() => User, (user) => user.waste)
  users: User
}

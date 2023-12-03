
import { Modulo1Entity } from '../modulo1/modulo1.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Modulo2Entity {
   @PrimaryGeneratedColumn("uuid")
   id: string;
   @Column()
   nombre: string;
   @Column()
   slogan: string;
   @OneToMany(() => Modulo1Entity, modulo1 => modulo1.modulo2)
   modulo1s: Modulo1Entity[];
}

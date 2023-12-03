import { Modulo1Entity } from '../modulo1/modulo1.entity';
import { Modulo3Entity } from '../modulo3/modulo3.entity';

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FotoEntity {
   @PrimaryGeneratedColumn("uuid")
   id: string;
   @Column()
   fecha: Date;
   @Column()
   ISO: number;
   @Column()
   velObturacion : number;
   @Column()
   apertura: number;

   @ManyToOne(() => Modulo3Entity, modulo3 => modulo3.fotos)
   modulo3: Modulo3Entity;
   @ManyToOne(() => Modulo1Entity, modulo1 => modulo1.fotos)
   modulo1: Modulo3Entity;
}

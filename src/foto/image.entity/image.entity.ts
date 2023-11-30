import { Modulo1Entity } from 'src/modulo1/modulo1.entity/modulo1.entity';
import { Modulo3Entity } from 'src/modulo3/modulo3.entity/modulo3.entity';

import { Column, Entity, Long, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FotoEntity {
   @PrimaryGeneratedColumn("uuid")
   id: String;
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


/* eslint-disable prettier/prettier */

import { FotoEntity } from '../foto/foto.entity';
import { Modulo2Entity } from '../modulo2/modulo2.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Modulo1Entity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 nombre: string;
 
 @Column()
 telefono: string;

 @ManyToOne(() => Modulo2Entity, modulo2 => modulo2.modulo1s)
   modulo2: Modulo2Entity[];

 @OneToMany(() => FotoEntity, foto => foto.modulo1)
   fotos: FotoEntity[];
}

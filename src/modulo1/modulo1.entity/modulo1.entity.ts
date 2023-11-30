
/* eslint-disable prettier/prettier */

import { FotoEntity } from 'src/foto/foto.entity/foto.entity';
import { Modulo2Entity } from 'src/modulo2/modulo2.entity/modulo2.entity';
import { Modulo3Entity } from 'src/modulo3/modulo3.entity/modulo3.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Modulo1Entity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 name: string;
 
 @Column()
 description: string;
 
 @Column()
 address: string;
 
 @Column()
 city: string;

 @Column()
 image: string;

 @ManyToOne(() => Modulo2Entity, modulo2 => modulo2.modulo1s)
   modulo2: Modulo2Entity[];

 @OneToMany(() => FotoEntity, foto => foto.modulo1)
   fotos: Modulo3Entity[];
}


import { FotoEntity } from "../foto/foto.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Modulo3Entity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
 
    @Column()
    titulo: string;
 
    @Column()
    fechaInicio: Date;
 
    @Column()
    fechaFin: Date;

    @OneToMany(() => FotoEntity, foto => foto.modulo3)
    fotos: FotoEntity[];

}

import { TypeOrmModule } from '@nestjs/typeorm';

import { Modulo1Entity } from '../../modulo1/modulo1.entity';
import { Modulo2Entity } from '../../modulo2/modulo2.entity';
import { Modulo3Entity } from '../../modulo3/modulo3.entity';
import { FotoEntity } from '../../foto/foto.entity';


export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [FotoEntity, Modulo1Entity, Modulo2Entity, Modulo3Entity],
   synchronize: true,
   keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([FotoEntity, Modulo1Entity, Modulo2Entity, Modulo3Entity]),
];
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Modulo1Module } from './modulo1/modulo1.module';
import { Modulo2Module } from './modulo2/modulo2.module';
import { Modulo3Module } from './modulo3/modulo3.module';

import { FotoModule } from './foto/foto.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Modulo3Entity } from './modulo3/modulo3.entity/modulo3.entity';
import { Modulo2Entity } from './modulo2/modulo2.entity/modulo2.entity';
import { FotoEntity} from './foto/foto.entity/foto.entity';


@Module({
  imports: [Modulo1Module, Modulo2Module, Modulo3Module, FotoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Mundo753',
      database: 'parcial-2',
      entities: [ Modulo3Entity, Modulo2Entity, FotoEntity, Modulo1Entity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

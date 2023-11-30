import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Modulo1Module } from './modulo1/modulo1.module';
import { Modulo2Module } from './modulo2/modulo2.module';
import { Modulo3Module } from './modulo3/modulo3.module';
import { Modulo4Module } from './modulo4/modulo4.module';
import { ImageModule } from './foto/foto.module';
import { Modulo5Module } from './modulo5/modulo5.module';
import { Modulo6Module } from './modulo6/modulo6.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modulo5Entity } from './Modulo5/modulo5.entity/modulo5.entity';
import { Modulo3Entity } from './modulo3/modulo3.entity/modulo3.entity';
import { Modulo2Entity } from './modulo2/modulo2.entity/modulo2.entity';
import { ImageEntity } from './foto/foto.entity/foto.entity';
import { Modulo6Entity } from './modulo6/modulo6.entity/modulo6.entity';
import { Modulo1Entity } from './modulo1/modulo1.entity/modulo1.entity';
import { Modulo4Entity } from './Modulo4/modulo4.entity/modulo4.entity';

@Module({
  imports: [Modulo1Module, Modulo2Module, Modulo3Module, Modulo4Module, ImageModule, Modulo5Module, Modulo6Module,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Mundo753',
      database: 'parcial-2',
      entities: [Modulo5Entity, Modulo3Entity, Modulo2Entity, ImageEntity, Modulo6Entity, Modulo1Entity, Modulo4Entity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

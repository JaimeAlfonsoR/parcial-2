import { Module } from '@nestjs/common';
import { Modulo3Service } from './modulo3.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modulo3Entity } from './modulo3.entity';
import { FotoEntity } from 'src/foto/foto.entity';

@Module({
  providers: [Modulo3Service],
  imports: [TypeOrmModule.forFeature([Modulo3Entity, FotoEntity])],
})
export class Modulo3Module {}

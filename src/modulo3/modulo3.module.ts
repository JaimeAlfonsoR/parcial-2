import { Module } from '@nestjs/common';
import { Modulo3Service } from './modulo3.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modulo1Entity } from 'src/modulo1/modulo1.entity/modulo1.entity';

@Module({
  providers: [Modulo3Service],
  imports: [TypeOrmModule.forFeature([Modulo1Entity])],
})
export class Modulo3Module {}

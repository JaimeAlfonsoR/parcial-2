import { Module } from '@nestjs/common';
import { Modulo1Service } from './modulo1.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modulo1Entity } from './modulo1.entity';

@Module({
  providers: [Modulo1Service],
  imports: [TypeOrmModule.forFeature([Modulo1Entity])],
})
export class Modulo1Module {}

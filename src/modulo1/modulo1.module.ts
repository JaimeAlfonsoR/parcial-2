import { Module } from '@nestjs/common';
import { Modulo1Service } from './modulo1.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modulo1Entity } from './modulo1.entity';
import { Modulo1Controller } from './modulo1.controller';

@Module({
  providers: [Modulo1Service],
  imports: [TypeOrmModule.forFeature([Modulo1Entity])],
  controllers: [Modulo1Controller],
})
export class Modulo1Module {}

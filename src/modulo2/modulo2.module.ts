import { Module } from '@nestjs/common';
import { Modulo2Service } from './modulo2.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modulo2Entity } from './modulo2.entity';
import { Modulo2Controller } from './modulo2.controller';

@Module({
  providers: [Modulo2Service],
  imports: [TypeOrmModule.forFeature([Modulo2Entity])],
  controllers: [Modulo2Controller],
})
export class Modulo2Module {}

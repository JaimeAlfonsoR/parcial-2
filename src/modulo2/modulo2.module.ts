import { Module } from '@nestjs/common';
import { Modulo2Service } from './modulo2.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modulo2Entity } from './modulo2.entity';

@Module({
  providers: [Modulo2Service],
  imports: [TypeOrmModule.forFeature([Modulo2Entity])],
})
export class Modulo2Module {}

import { Module } from '@nestjs/common';
import { Modulo2Service } from './modulo2.service';

@Module({
  providers: [Modulo2Service]
})
export class Modulo2Module {}

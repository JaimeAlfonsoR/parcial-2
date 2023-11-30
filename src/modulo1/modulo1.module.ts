import { Module } from '@nestjs/common';
import { Modulo1Service } from './modulo1.service';

@Module({
  providers: [Modulo1Service]
})
export class Modulo1Module {}

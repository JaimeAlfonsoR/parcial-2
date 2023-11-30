import { Module } from '@nestjs/common';
import { Modulo3Service } from './modulo3.service';

@Module({
  providers: [Modulo3Service]
})
export class Modulo3Module {}

import { Module } from '@nestjs/common';
import { FotoService } from './foto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoEntity } from './foto.entity';
import { FotoController } from './foto.controller';
import { Modulo3Entity } from '../modulo3/modulo3.entity';

@Module({
  providers: [FotoService],
  imports: [TypeOrmModule.forFeature([Modulo3Entity, FotoEntity])],
  controllers: [FotoController],
})
export class FotoModule {}

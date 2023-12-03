import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { Modulo3Service } from './modulo3.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { Modulo3Dto } from './modulo3.dto/modulo3.dto';
import { Modulo3Entity } from './modulo3.entity';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('albums')
export class Modulo3Controller {
    constructor(private readonly modulo3Service: Modulo3Service) {}
    @Get(':modulo3Id')
    async findOne(@Param('modulo3Id') modulo3Id: string) {
        return await this.modulo3Service.findOne(modulo3Id);
    }
    @Post()
    async create(@Body() modulo3Dto: Modulo3Dto) {
        const modulo3: Modulo3Entity = plainToInstance(Modulo3Entity, modulo3Dto);
        return await this.modulo3Service.create(modulo3);
    }
    @Delete(':modulo3Id')
    @HttpCode(204)
    async delete(@Param('modulo3Id') modulo3Id: string) {
        return await this.modulo3Service.delete(modulo3Id);
    }
}

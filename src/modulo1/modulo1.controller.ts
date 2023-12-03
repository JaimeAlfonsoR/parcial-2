import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { Modulo1Service } from './modulo1.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { Modulo1Dto } from './modulo1.dto/modulo1.dto';
import { Modulo1Entity } from './modulo1.entity';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('usuarios')
export class Modulo1Controller {
    constructor(private readonly modulo1Service: Modulo1Service) {}
    @Get()
    async findAll() {
        return await this.modulo1Service.findAll();
    }
    @Get(':modulo1Id')
    async findOne(@Param('modulo1Id') modulo1Id: string) {
        return await this.modulo1Service.findOne(modulo1Id);
    }
    @Post()
    async create(@Body() modulo1Dto: Modulo1Dto) {
        const modulo1: Modulo1Entity = plainToInstance(Modulo1Entity, modulo1Dto);
        return await this.modulo1Service.create(modulo1);
    }
}

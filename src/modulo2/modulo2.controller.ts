import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { Modulo2Service } from './modulo2.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { Modulo2Dto } from './modulo2.dto/modulo2.dto';
import { Modulo2Entity } from './modulo2.entity';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('redes')
export class Modulo2Controller {
    constructor(private readonly modulo2Service: Modulo2Service) {}
    @Post()
    async create(@Body() modulo2Dto: Modulo2Dto) {
        const modulo2: Modulo2Entity = plainToInstance(Modulo2Entity, modulo2Dto);
        return await this.modulo2Service.create(modulo2);
    }
}

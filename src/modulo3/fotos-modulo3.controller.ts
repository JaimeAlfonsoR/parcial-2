import { Controller, Param, Post, UseInterceptors } from '@nestjs/common';

import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { Modulo3Service } from './modulo3.service';

@Controller('albums')
@UseInterceptors(BusinessErrorsInterceptor)
export class Modulo3fotoController {
   constructor(private readonly modulo3Service: Modulo3Service){}
   @Post(':albumId/fotoss/:fotoId')
   async addfotoModulo3(@Param('modulo3Id') modulo3Id: string, @Param('fotoId') fotoId: string){
       return await this.modulo3Service.addfotoModulo3(modulo3Id, fotoId);
   }
}

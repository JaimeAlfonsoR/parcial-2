import { Controller, Param, Post, UseInterceptors } from '@nestjs/common';

import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { Modulo3Service } from './modulo3.service';


@UseInterceptors(BusinessErrorsInterceptor)
@Controller('albums')
export class Modulo3fotoController {
   constructor(private readonly modulo3Service: Modulo3Service){}
   @Post(':albumId/fotos/:fotoId')
   async addfotoModulo3(@Param('albumId') albumId: string, @Param('fotoId') fotoId: string){
       return await this.modulo3Service.addfotoModulo3(albumId, fotoId);
   }
}

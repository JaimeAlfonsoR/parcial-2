import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class FotoDto {
   
   @IsDate()
   @IsNotEmpty()
   readonly fecha: Date;
   
   @IsNumber()
   @IsNotEmpty()
   readonly ISO: number;
   
   @IsNumber()
   @IsNotEmpty()
   readonly velObturacion : number;
   
   @IsNumber()
   @IsNotEmpty()
   readonly apertura: number;
}

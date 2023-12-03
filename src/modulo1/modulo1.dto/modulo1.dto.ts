import { IsString, IsNotEmpty } from "class-validator";

export class Modulo1Dto {
   @IsString()
   @IsNotEmpty()
   readonly nombre: string;
   
   @IsString()
   @IsNotEmpty()
   readonly telefono: string;
   
}

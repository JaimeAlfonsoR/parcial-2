import { IsString, IsNotEmpty } from "class-validator";

export class Modulo2Dto {
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly slogan: string;
}

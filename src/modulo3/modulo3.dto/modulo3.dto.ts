import { IsString, IsNotEmpty, IsDate } from "class-validator";

export class Modulo3Dto {
    @IsString()
    @IsNotEmpty()
    readonly titulo: string;

    @IsDate()
    @IsNotEmpty()
    readonly fechaInicio: Date;

    @IsDate()
    @IsNotEmpty()
    readonly fechaFin: Date;
}

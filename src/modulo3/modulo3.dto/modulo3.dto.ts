import { IsString, IsNotEmpty, IsDate } from "class-validator";

export class Modulo3Dto {
    @IsString()
    @IsNotEmpty()
    readonly titulo: string;

    @IsNotEmpty()
    readonly fechaInicio: Date;

    @IsNotEmpty()
    readonly fechaFin: Date;
}

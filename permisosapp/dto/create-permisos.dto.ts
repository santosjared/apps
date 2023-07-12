import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Matches } from "class-validator";

export class CreatePermisoAppDto{
    @ApiProperty()
    @IsNotEmpty({message:'el campo name es requerido'})
    @Matches(/^[a-zA-Z' '_-]{3,64}$/,{message:'el campo name debe contener solo caracteres' +
    ' y debe ser como minima 3 y maxima 64 caracteres '})
    name:string
    
    isDeleted?:boolean
}
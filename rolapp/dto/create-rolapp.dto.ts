import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Matches} from "class-validator";


export class CreateRolAppDto {

    @ApiProperty()
    @IsNotEmpty({message:'el campo titulo es requerido'})
    @Matches(/^[a-zA-Z0-9' '_-]{3,64}$/,{message:'el campo titulo debe contener solo caracteres' +
    ' y debe ser como minima 3 y maxima 64 caracteres '})
    titulo: string
    @ApiProperty()
    apps:string
    @ApiProperty()
    permisos:[]

    isDeleted?:boolean
}
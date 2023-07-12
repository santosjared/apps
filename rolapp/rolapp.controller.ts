import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateRolAppDto} from "./dto/create-rolapp.dto";
import { RolAppService} from "./rolapp.service";
import { AppsService } from "../apps.service";

@ApiTags('Rol-App')
@Controller('Rol-App')
export class RolAppContorller{
    constructor(private readonly serviceRolApp:RolAppService,
    ){}
    @Get()
    async findAll(){
        return await this.serviceRolApp.findAll()
    }
    @Get(':id')
    async findById(@Param('id') id:string){
        const modulo = await this.serviceRolApp.findById(id)
        if(modulo.isDeleted){
            throw new HttpException('no se encuentra el permiso',HttpStatus.NOT_FOUND)
        }
        return modulo
    }
    @Post('/create')
    @UsePipes(new ValidationPipe())
    async create(@Body() body:CreateRolAppDto){
        return this.serviceRolApp.create(body)
    }
    @Put('/update:id')
    @UsePipes(new ValidationPipe())
    async update(@Param('id') id: string, @Body() body:CreateRolAppDto)
    {
        return await this.serviceRolApp.update(id,body)
    }
    @Delete('/delete:id')
    async delete(@Param('id') id:string){
       await this.serviceRolApp.delete(id)
       throw new HttpException('rol eliminado',HttpStatus.OK)

    }
}
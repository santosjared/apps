import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreatePermisoAppDto } from "./dto/create-permisos.dto";
import { PermisosAppService } from "./permisosapp.service";


@ApiTags('Permiso-App')
@Controller('Permiso-App')
export class PermisosAppController {
    constructor(private readonly permisosAppService:PermisosAppService){}
    @Get()
    async findAll(){
        return await this.permisosAppService.findAll();
    }
    @Get(':id')
    async getById(@Param('id') id:string){
        const permiso = await this.permisosAppService.findByid(id)
        if(permiso.isDeleted){
            throw new HttpException('no se encuentra el permiso',HttpStatus.NOT_FOUND)
        }
        return permiso
    }
    @Post()
    @UsePipes(new ValidationPipe())
    async createPermiso(@Body() Body:CreatePermisoAppDto){
        return await this.permisosAppService.create(Body)
    }
    @Put('/update:id')
    @UsePipes(new ValidationPipe())
    async updatePermiso(@Param('id') id:string, @Body() Body: CreatePermisoAppDto){
        return await this.permisosAppService.update(id,Body)
    }
    @Delete('/delete:id')
    async deletePermiso(@Param('id') id:string){
        await this.permisosAppService.remove(id)
        throw new HttpException('permiso eliminado',HttpStatus.OK)
    }
}
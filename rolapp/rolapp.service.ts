import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { RolApp, RolAppDocument } from "./schema/rolapp.schema";
import { Model } from "mongoose";
import { CreateRolAppDto } from "./dto/create-rolapp.dto";
import { App, AppDocument } from "../schema/apps.schema";
import { PermisosApp, PermisosAppDocument } from "../permisosapp/schema/permisosapp.schema";

@Injectable()
export class RolAppService{
    constructor(@InjectModel(RolApp.name) private readonly RolAppModel:Model<RolAppDocument>,
    @InjectModel(App.name) private readonly appModel:Model<AppDocument>,
    @InjectModel(PermisosApp.name) private readonly permisoModel: Model<PermisosAppDocument>
    )
    {}
    async findAll(){
        return await this.RolAppModel.find()
    }
    async findById(id:string){
        try{
            return await this.RolAppModel.findById(id)
        }catch(e){
            throw new HttpException('el modulo no se encuntra registrado, id invalido',HttpStatus.NOT_FOUND)
        }
    }
    async create(body:CreateRolAppDto){
        const {titulo} = body
        const {apps} = body
        const {permisos} = body
        const existePer = this.virificar(permisos)
        if(!(await existePer).valueOf()){
            throw new HttpException('permiso no encontrado', 404)
        }
        try{
            await this.appModel.findById(apps) 
        }catch(e)
        {
            throw new HttpException('aplicacion no encontrado',HttpStatus.NOT_FOUND)
        }
        const find = await this.RolAppModel.findOne({titulo: titulo.toLocaleLowerCase()})
        if(find){
            if(find.isDeleted){
                find.isDeleted = false
                return find.save()
            }
            throw new HttpException('el rol ya existe en app',409)
        }
        return await this.RolAppModel.create(body)

    }
    async update(id:string, body:CreateRolAppDto){
        await this.findById(id)
        const {titulo} = body
        const find = await this.RolAppModel.findOne({titulo: titulo.toLocaleLowerCase()})
        if(find){
            throw new HttpException('el permiso ya esta registrado',409)
        }
        return await this.RolAppModel.findByIdAndUpdate(id,body,{new:true})
    }
    async delete(id:string){
        await this.findById(id)
        const deleted = await this.RolAppModel.findOne({_id: id})
        if(deleted){
            deleted.isDeleted = true
            return deleted.save()
        }
    }
    async virificar(permisos:[]){
        let existePer = true
        for(let i =0; i<permisos.length;i++)
        {
            try{
                await this.permisoModel.findById(permisos[i])
            }catch(e){
                existePer = false
            }
        }
       return existePer
    }
}
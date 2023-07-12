import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PermisosApp, PermisosAppDocument } from "./schema/permisosapp.schema";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreatePermisoAppDto } from "./dto/create-permisos.dto";

@Injectable()
export class PermisosAppService{
    constructor(
        @InjectModel(PermisosApp.name) private readonly permisoAppModel: Model<PermisosAppDocument>
    ){}
    async findAll(){
        return await this.permisoAppModel.find({isDeleted:false}).exec()
    }
    async findByid(id:string){
        try{
            return await this.permisoAppModel.findById(id)
        }catch(e){
            throw new HttpException('permiso no resgistrado, id ivalido',HttpStatus.NOT_FOUND)
        }
    }
    async create(Body:CreatePermisoAppDto){
        const {name} = Body
        const findPer = await this.permisoAppModel.findOne({name: name})
        if(findPer){
            if(findPer.isDeleted){
                findPer.isDeleted = false
                return findPer.save()
            }
            throw new HttpException('el permiso ya existe',409)
        }
        return await this.permisoAppModel.create(Body)
    }
    async update (id:string, body:CreatePermisoAppDto){
        await this.findByid(id)
        const {name} = body
        const findFer = await this.permisoAppModel.findOne({name: name})
        if(findFer){
            throw new HttpException('el permiso ya esta registrado',409)
        }
        return await this.permisoAppModel.findByIdAndUpdate(id,body,{new:true})
    }
    async remove(id:string){
        await this.findByid(id)
        const deleted = await this.permisoAppModel.findOne({_id: id})
        if(deleted){
            deleted.isDeleted = true
            return deleted.save()
        }
    }
}
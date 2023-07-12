import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export type PermisosAppDocument = HydratedDocument<PermisosApp>

@Schema()
export class PermisosApp {
    @Prop({type: String, default:()=> uuidv4()})
    uuid:string

    @Prop({required:true})
    name:string
    
    @Prop({default:false})
    isDeleted?:boolean
}
export const  PermisosAppSchema = SchemaFactory.createForClass(PermisosApp)
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument} from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export type RolAppDocument = HydratedDocument<RolApp>

@Schema()
export class RolApp{

    @Prop({ type:String, default: () => uuidv4() })
    uuid: string

    @Prop({required:true})
    titulo:string
    @Prop()
    app: string
    @Prop({required:true})
    permisos:[]
    @Prop({default:false})
    isDeleted?:boolean
}
export const RolAppSchema = SchemaFactory.createForClass(RolApp)



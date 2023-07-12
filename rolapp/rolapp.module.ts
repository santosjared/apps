import { Module } from "@nestjs/common";
import { RolAppContorller } from "./rolapp.controller";
import { RolAppService } from "./rolapp.service";
import { MongooseModule, Schema } from "@nestjs/mongoose";
import { RolApp, RolAppSchema } from "./schema/rolapp.schema";
import { PermisosApp, PermisosAppSchema } from "../permisosapp/schema/permisosapp.schema";
import { App, AppSchema } from "../schema/apps.schema";

@Module({
    imports:[MongooseModule.forFeature([
        {
            name:RolApp.name,
            schema:RolAppSchema
        }
        ,        {
            name:App.name,
            schema:AppSchema
        },
        {
            name:PermisosApp.name,
            schema:PermisosAppSchema
        }
    ])
],
    controllers:[RolAppContorller],
    providers:[RolAppService]
})
export class RolAppModule{}
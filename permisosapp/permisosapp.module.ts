import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PermisosApp, PermisosAppSchema } from "./schema/permisosapp.schema";
import { PermisosAppController } from "./permisosapp.controller";
import { PermisosAppService } from "./permisosapp.service";


@Module({
    imports:[MongooseModule.forFeature([
        {
            name:PermisosApp.name,
            schema:PermisosAppSchema
        }
    ]),
],
controllers:[PermisosAppController],
providers:[PermisosAppService]
})
export class PermisoAppMoudle {}
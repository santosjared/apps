import { Module } from '@nestjs/common';
import { AppsService } from './apps.service';
import { AppsController } from './apps.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { App, AppSchema } from './schema/apps.schema';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { Permission, PermissionSchema } from 'src/permission/schema/permission.schema';
import { Rol, RolSchema } from 'src/rol/schema/rol.schema';
import { PermisoAppMoudle } from './permisosapp/permisosapp.module';
import { RolAppModule } from './rolapp/rolapp.module';

@Module({
  imports:[MongooseModule.forFeature([
    { name:App.name, schema:AppSchema },    
    { name: User.name, schema: UserSchema },
    { name:Permission.name, schema:PermissionSchema },
    { name:Rol.name, schema:RolSchema }
  ]),
  PermisoAppMoudle,RolAppModule
  ],
  controllers: [AppsController],
  providers: [AppsService]
})
export class AppsModule {}

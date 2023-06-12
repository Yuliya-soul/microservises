import { Module } from '@nestjs/common';

import { User, UserSchema } from './models/user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './repositories/user.repository';
import { UserQueries } from './user.queries';
import { UserCommands } from './user.commands';

@Module({
    imports:[MongooseModule.forFeature([{name:User.name,schema:UserSchema}])],
    providers:[UserRepository],
    exports:[UserRepository],
    controllers:[UserQueries,UserCommands]

})
export class UserModule {}

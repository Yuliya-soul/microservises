import{Document,Types} from 'mongoose';
import{IUser,IUserSkills,SkillState,UserRole} from '@microservices/interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserSkills extends Document implements IUserSkills{
    @Prop({required:true})
    skillId: string;

    @Prop({required:true,enum:SkillState, type:String})
    skillState: SkillState;

}
export const UserSkillsSchema=SchemaFactory.createForClass(UserSkills)

@Schema()
export class User extends Document implements IUser{
    @Prop()
    displayName?: string;

    @Prop({required:true})
    email: string;
    
    @Prop({required:true})
    passwordHash: string;

    @Prop({required:true,enum:UserRole, type:String,default:UserRole.Student})
    role: UserRole;

    @Prop({type:[UserSkillsSchema],_id: false})
        skills:Types.Array<UserSkills>
      
}
export const UserSchema=SchemaFactory.createForClass(User)
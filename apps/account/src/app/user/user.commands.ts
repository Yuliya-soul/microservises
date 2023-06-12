import { Body, Controller} from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { AccountChangeProfile } from '@microservices/contracts';
import { UserEntity } from './entities/user.entity';


@Controller()
export class UserCommands {
    constructor(
		private readonly userRepository: UserRepository
	) {}

	@RMQValidate()
	@RMQRoute(AccountChangeProfile.topic)
	async userInfo(@Body()  {user,id}: AccountChangeProfile.Request): Promise<AccountChangeProfile.Response> {
                const userExist= await this.userRepository.findUserId(id)
                if(!userExist){
                    throw new Error('user doesn\'t exist')
                }
                const UserEntityNew=new UserEntity(userExist).updateUserProfile(user.displayName);
             await   this.userRepository.updateUser(UserEntityNew)
		return {}
	}

}
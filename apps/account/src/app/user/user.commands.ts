import { Body, Controller } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { RMQRoute, RMQService, RMQValidate } from 'nestjs-rmq';
import { AccountChangeProfile, ProgressGenerateLink, SkillGetSkill } from '@microservices/contracts';
import { AddSkillSaga } from './sagas/add-skill.saga';
import { UserEntity } from './entities/user.entity';

@Controller()
export class UserCommands {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly rmqService: RMQService
  ) {}

  @RMQValidate()
  @RMQRoute(AccountChangeProfile.topic)
  async userInfo(
    @Body() { user, id }: AccountChangeProfile.Request
  ): Promise<AccountChangeProfile.Response> {
    const userExist = await this.userRepository.findUserById(id);
    if (!userExist) {
      throw new Error("user doesn't exist");
    }
    const UserEntityNew = new UserEntity(userExist).updateUserProfile(
      user.displayName
    );
    await this.userRepository.updateUser(UserEntityNew);
    return {};
  }

  @RMQValidate()
  @RMQRoute(ProgressGenerateLink.topic)
  async startSkill(
    @Body() { userId, skillId }: ProgressGenerateLink.Request
  ): Promise<ProgressGenerateLink.Response> {
    const userCurrent = await this.userRepository.findUserById(userId);
    if (!userCurrent) {
      throw new Error("user doesn't exist");
    }
    const UserEntityNew = new UserEntity(userCurrent);
    const saga = new AddSkillSaga(UserEntityNew, skillId, this.rmqService);
    const { user, skillStartLink } = await saga.getState().startSkill();
    await this.userRepository.updateUser(user)
    return { skillStartLink };
  }

}

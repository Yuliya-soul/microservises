import { ProgressGenerateLink, SkillGetSkill } from '@microservices/contracts';
import { UserEntity } from '../entities/user.entity';
import { AddSkillSagaState } from './add-skill.state';
import { SkillState } from '@microservices/interfaces';

export class StudySkillSagaStateStarted extends AddSkillSagaState {

  public async startSkill(): Promise<{
    skillStartLink: string;
    user: UserEntity;
  }> {
    const { skill } = await this.saga.rmqService.send<
      SkillGetSkill.Request,
      SkillGetSkill.Response
    >(SkillGetSkill.topic, {
      skillId: this.saga.skillId,
      userId: ''
    });
    if (!skill) {
      throw new Error("skill doesn't exist");
    }
    if (skill.value !== '') {
        this.saga.setState(SkillState.Started, skill._id);
      return { skillStartLink: null, user: this.saga.user };
    }
    const { skillStartLink } = await this.saga.rmqService.send<
      ProgressGenerateLink.Request,
      ProgressGenerateLink.Response
    >(ProgressGenerateLink.topic, {
      skillId: skill._id,
      userId: this.saga.user._id,
      value: skill.value,
    });
    this.saga.setState(SkillState.WaitingForUpgrade, skill._id);
    return { skillStartLink: skillStartLink, user: this.saga.user };
  }
  
  public checkStartSkill(): Promise<{ user: UserEntity }> {
    throw new Error("Can't check not started skill ");
  }
  public async cancel(): Promise<{ user: UserEntity }> {
    this.saga.setState(SkillState.Canceled,this.saga.skillId);
    return await {user:this.saga.user}
  }
}

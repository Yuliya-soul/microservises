import { RMQService } from 'nestjs-rmq';
import { UserEntity } from '../entities/user.entity';
import { SkillState } from '@microservices/interfaces';
import { AddSkillSagaState } from './add-skill.state';
import { StudySkillSagaStateStarted } from './add-skill.steps';

export class AddSkillSaga {
  private state: AddSkillSagaState;
  constructor(
    public user: UserEntity,
    public skillId: string,
    public rmqService: RMQService
  ) {}

  public getState() {
    return this.state;
  }
  public setState(state: SkillState, skillId:string) {
    switch (state) {
      case SkillState.Started:
        this.state=new StudySkillSagaStateStarted()
        break;
      case SkillState.InProgress:
        break;
      case SkillState.WaitingForUpgrade:
        break;
      case SkillState.Canceled:
        break;
    }
   this.state.setContext(this)
    this.user.updateSkillStatus(skillId, state)
  }
}

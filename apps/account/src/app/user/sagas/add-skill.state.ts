import { UserEntity } from '../entities/user.entity';
import { AddSkillSaga } from './add-skill.saga';
import { SkillStatus } from '@microservices/contracts';

export abstract class AddSkillSagaState {
  public saga: AddSkillSaga;
  public setContext(saga: AddSkillSaga) {
    this.saga = saga;
  }
  public abstract startSkill():Promise<{skillStartLink:string, user:UserEntity}>
  public abstract checkStartSkill():Promise<{ user:UserEntity, status: SkillStatus}>
  public abstract cancel():Promise<{ user:UserEntity}>
}

import { UserEntity } from '../entities/user.entity';
import { AddSkillSaga } from './add-skill.saga';

export abstract class AddSkillSagaState {
  public saga: AddSkillSaga;
  public setContext(saga: AddSkillSaga) {
    this.saga = saga;
  }
  public abstract startSkill():Promise<{courseStartLink:string, user:UserEntity}>
  public abstract checkStartSkill():Promise<{ user:UserEntity}>
  public abstract cancel():Promise<{ user:UserEntity}>
}

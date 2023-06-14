import {
  IUser,
  IUserSkills,
  SkillState,
  UserRole,
} from '@microservices/interfaces';
import { compare, genSalt, hash } from 'bcryptjs';

export class UserEntity implements IUser {
  _id?: string;
  displayName?: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  skills?: IUserSkills[];

  constructor(user: IUser) {
    this._id = user._id;
    this.displayName = user.displayName;
    this.email = user.email;
    this.role = user.role;
    this.passwordHash = user.passwordHash;
    this.skills = user.skills;
  }
  public async setPassword(password: string) {
    const salt = await genSalt(10);
    this.passwordHash = await hash(password, salt);
    return this;
  }
  public validatePassword(password: string) {
    return compare(password, this.passwordHash);
  }
  public updateUserProfile(displayName: string) {
    this.displayName = displayName;
    return this;
  }
  public getPublicProfile() {
    return {
      displayName: this.displayName,
      role: this.role,
      email: this.email,
    };
  }
  public addSkill(skillId: string) {
    const exist = this.skills.find((skill) => skill._id === skillId);
    if (exist) {
      throw new Error('skill already exist');
    }
    this.skills.push({ skillId, skillState: SkillState.Started });
  }
  public deleteSkill(skillId: string) {
    this.skills.filter((skill) => skill._id !== skillId);
  }
  public updateSkillStatus(skillId: string, state: SkillState) {
    this.skills = this.skills.map((skill) => {
      if (skill._id === skillId) {
        skill.skillState = state;
        return skill
      }
      return
    });
  }
}

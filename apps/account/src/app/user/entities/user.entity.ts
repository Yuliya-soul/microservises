import { IUser, IUserSkills, UserRole } from '@microservices/interfaces';
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
}

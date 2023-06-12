import { IsString } from 'class-validator';
import { IUserSkills } from '@microservices/interfaces';

export namespace AccountUserSkills {
  export const topic = 'account.user-skills.query';

  export class Request {
    @IsString()
    id: string;
  }
  export class Response {
    skills: IUserSkills[];
  }
}

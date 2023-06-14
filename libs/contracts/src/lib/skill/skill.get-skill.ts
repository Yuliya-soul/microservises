import { ISkill } from '@microservices/interfaces';
import { IsString } from 'class-validator';

export namespace SkillGetSkill {
  export const topic = 'skill.get-skill.query';

  export class Request {
    @IsString()
    userId: string;

    @IsString()
    skillId: string;
  }
  export class Response {

    @IsString()
    skill: ISkill|null;
  }

}

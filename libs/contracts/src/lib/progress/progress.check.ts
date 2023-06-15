import { IsString } from 'class-validator';

export type SkillStatus = 'progress' | 'canceled' | 'success';

export namespace ProgressCheckSkill {
  export const topic = 'progress.check.query';

  export class Request {
    @IsString()
    skillId: string;

    @IsString()
    userId: string;
  }
  export class Response {
    status: SkillStatus;
  }
}

import {  IsString } from 'class-validator';


export namespace ProgressGenerateLink {
  export const topic = 'progress.generate-link.command';

  export class Request {
    @IsString()
    skillId: string;

    @IsString()
    userId: string;

    @IsString()
    value: string;
  }
  export class Response {
    @IsString()
    skillStartLink: string;

  }
}

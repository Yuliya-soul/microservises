import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';
export namespace AccountRegister {
  export const topic = 'account.register.command';

  export class Request {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsOptional()
    @IsString()
    displayName?: string;
  }
  export class Response {
    @IsEmail()
    email: string;
  }
}

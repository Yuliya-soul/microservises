import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export namespace AccountLogin {
  export const topic = 'account.login.command';

  export class Request {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
  }
  export class Response {
    @IsString()
    @IsNotEmpty()
    access_token: string;
  }
}

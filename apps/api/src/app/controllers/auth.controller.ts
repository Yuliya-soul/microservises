import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AccountLogin, AccountRegister } from '@microservices/contracts';
import { RMQService } from 'nestjs-rmq';
import { RegisterDto, LoginDto } from '../dtos';


@Controller('auth')
export class AuthController {
  constructor(private readonly rmqService: RMQService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    try {
      return await this.rmqService.send<
        AccountRegister.Request,
        AccountRegister.Response
      >(AccountRegister.topic, dto);  
    } catch (e) {
      throw e || new UnauthorizedException(e.message);
    }
  }
  @Post('login')
  async login(@Body() dto:LoginDto) {
    try {
      return await this.rmqService.send<
        AccountLogin.Request,
        AccountLogin.Response
      >(AccountLogin.topic, dto);
    } catch (e) {
      throw e || new UnauthorizedException(e.message);
    }
  }
}

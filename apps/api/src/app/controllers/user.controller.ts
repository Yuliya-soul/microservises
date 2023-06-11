import { Controller, Post, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from '../guards/jwt.guard';
import { UserId } from '../guards/user.decorator';

@Controller('user')
export class UserController {

  @UseGuards(JWTAuthGuard)
  @Post('info')
  async info(@UserId() userId:string) {
    return userId
  };

}
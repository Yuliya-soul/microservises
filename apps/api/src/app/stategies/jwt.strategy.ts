import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {IJWTPayload} from '@microservices/interfaces'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService:ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey:configService.get('JWT_SECRET')
    });
  }

  async validate({id}: IJWTPayload) {
    return id
  }
}
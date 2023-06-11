import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from './configs/mongo.config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RMQModule } from 'nestjs-rmq';
import { getRMQConfig } from './configs/rmq.config';

@Module({
  imports: [
    MongooseModule.forRootAsync(getMongoConfig()),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.account.env' }),
     AuthModule,
    UserModule,
    RMQModule.forRootAsync(getRMQConfig())
  ],
})
export class AppModule {}

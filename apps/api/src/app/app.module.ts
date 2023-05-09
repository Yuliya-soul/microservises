import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { ScheduleModule } from '@nestjs/schedule';


@Module({
	imports: [
		ConfigModule.forRoot({ envFilePath: 'envs/.api.env', isGlobal: true }),
		PassportModule,
		ScheduleModule.forRoot()
	],
	controllers: []
})
export class AppModule {}

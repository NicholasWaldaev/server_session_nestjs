import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        SESSION_SECRET: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
      }),
    }),
    DatabaseModule,
    AuthenticationModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

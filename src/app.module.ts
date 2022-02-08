import * as Joi from '@hapi/joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm/connection/Connection';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { loggerMiddleware } from './common/middleware/logger.middleware';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './modules/database/database.module';
import { OtpModule } from './modules/otp/otp.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      DB_HOST: Joi.string().required(),
      DB_PORT: Joi.number().required(),
      DB_USER: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      DB_NAME: Joi.string().required(),
      JWT_SECRET: Joi.string().required(),
      JWT_EXPIRATION_TIME: Joi.string().required(),
    })
  }), UserModule, DatabaseModule, OtpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // constructor(private connection: Connection) { }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(loggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}



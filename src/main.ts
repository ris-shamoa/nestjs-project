import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'aws-sdk';
import { AllExceptionsFilter } from './common/filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  const configService = app.get(ConfigService);
  config.update({
    accessKeyId: configService.get('AMAZON_ACCESS_KEY'),
    secretAccessKey: configService.get('AMAZON_SECRET_KEY'),
    region: configService.get('AMAZON_REGION'),
  })
  await app.listen(3000);
}
bootstrap();

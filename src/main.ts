import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { validadeEnv } from './config/config.validate';
import { AppConfig } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = validadeEnv(
    app.get(ConfigService).get('appConfig'),
    AppConfig,
  );

  await app.listen(appConfig.port);
}
bootstrap();

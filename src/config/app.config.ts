import { IsDefined, IsEnum, IsNumber, Max, Min } from 'class-validator';

interface IAppConfig {
  port: number;
  environment: Environment;
}

export enum Environment {
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
}

export class AppConfig implements IAppConfig {
  @IsNumber()
  @Min(0)
  @Max(65535)
  @IsDefined()
  port: number;

  @IsEnum(Environment)
  @IsDefined()
  environment: Environment;

  constructor(partial: Partial<AppConfig>) {
    Object.assign(this, partial);
  }
}

export default () => ({
  appConfig: new AppConfig({
    port: parseInt(process.env.PORT, 10) || 3000,
    environment:
      (process.env.NODE_ENV as Environment) || Environment.Development,
  }),
});

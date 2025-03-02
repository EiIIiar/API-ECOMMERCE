import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppConfigModule } from 'src/config/config.module';
import { DBConfig } from 'src/config/sequelize.config';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: async (configService: ConfigService) => {
        const databaseConfig = configService.get<DBConfig>('databaseConfig');
        return {
          dialect: databaseConfig.dialect,
          host: databaseConfig.host,
          port: databaseConfig.port,
          username: databaseConfig.username,
          password: databaseConfig.password,
          autoLoadModels: databaseConfig.autoLoadModels,
          synchronize: databaseConfig.synchronize,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}

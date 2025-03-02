import {
  IsString,
  IsNumber,
  IsBoolean,
  IsIn,
  IsOptional,
} from 'class-validator';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Dialect, Model, ModelOptions } from 'sequelize';
import { isDevelopment } from './config-validate';

export class DBConfig implements SequelizeModuleOptions {
  @IsIn(['mssql'], {
    message: 'sequelize dialect must be mssql',
  })
  dialect: Dialect;

  @IsString()
  host: string;

  @IsNumber()
  port: number;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  database: string;

  @IsString()
  schema: string;

  @IsBoolean()
  autoLoadModels: boolean;

  @IsBoolean()
  synchronize: boolean;

  @IsOptional()
  define?: ModelOptions<Model<any, any>>;

  @IsBoolean()
  logging?: boolean;

  constructor(partial: Partial<DBConfig>) {
    Object.assign(this, partial);
  }
}

export default () => ({
  databaseConfig: new DBConfig({
    dialect: 'mssql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 1433,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE || 'master',
    schema: process.env.DB_SCHEMA || 'dbo',
    autoLoadModels: true,
    synchronize: isDevelopment() ? true : false,
    define: {
      timestamps: true,
    },
    logging: isDevelopment() ? true : false,
  }),
});

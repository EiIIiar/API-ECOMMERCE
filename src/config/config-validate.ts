import { Environment } from './app.config';

export function isProduction(): boolean {
  return process.env.NODE_ENV === Environment.Production;
}

export function isDevelopment(): boolean {
  return process.env.NODE_ENV === Environment.Development;
}

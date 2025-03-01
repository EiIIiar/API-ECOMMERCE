import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';
import { DefaultConfig } from './interfaces/default-config.interface';

function handleErros(errors: ValidationError[]): string {
  const erro: string[] = [];

  errors.forEach((err) => {
    erro.push(err.toString());
    const constraintKeys = Object.keys(err.constraints);
    constraintKeys.forEach((constraintKey) => {
      erro.push(err.constraints[constraintKey]);
    });
  });

  return erro.join(', ');
}

export function validadeEnv<T extends DefaultConfig | object>(
  config: Record<string, unknown>,
  classType: ClassConstructor<T>,
): T {
  const validatedConfig = plainToInstance(classType, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(handleErros(errors));
  }

  if (validatedConfig instanceof DefaultConfig) validatedConfig.validate();

  return validatedConfig;
}

import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

export class EnvironmentConfig<T extends object> {
  private readonly validatedConfig: T;

  constructor(private readonly environmentVariablesValidator: new () => T) {
    this.validatedConfig = this.validateConfiguration();
  }

  private validateConfiguration(): T {
    const validatedConfig = plainToClass(
      this.environmentVariablesValidator,
      process.env,
      {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      },
    );
    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
      validationError: {
        target: false,
      },
    });
    if (errors.length > 0) {
      throw new Error(`Invalid configuration: ${JSON.stringify(errors)}`);
    }
    return validatedConfig;
  }

  getConfiguration(): T {
    return this.validatedConfig;
  }
}

import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export function validateConfigs<T extends object>(classes: (new () => T)[]) {
  return (config: Record<string, unknown>) => {
    const result = {};

    for (const TargetClass of classes) {
      const instance = plainToInstance(TargetClass, config, {
        enableImplicitConversion: true,
      });

      const errors = validateSync(instance, {
        skipMissingProperties: false,
      });

      if (errors.length > 0) {
        throw new Error(errors.toString());
      }

      Object.assign(result, instance);
    }

    return result;
  };
}

import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isURL,
} from 'class-validator';

export function IsUrlArray(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string[]) {
          if (!Array.isArray(value)) return false;
          for (const item of value) {
            if (!isURL(item)) return false;
          }
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be an array of valid URLs`;
        },
      },
    });
  };
}

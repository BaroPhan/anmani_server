import { ValidatorConstraintInterface, isUUID } from 'class-validator';
import { Repository } from 'typeorm';
import { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';
import { Injectable } from '@nestjs/common';
import { Helper } from '../helper.utils';

@Injectable()
export abstract class BaseValidator implements ValidatorConstraintInterface {
  message: string;

  constructor(protected helper: Helper) {}

  checkPropertyType(value: string, type: string): boolean {
    switch (type) {
      case 'uuid':
        return isUUID(value, 4);
      default:
        // eslint-disable-next-line valid-typeof
        return typeof value === type;
    }
  }

  getPropertyType<T>(
    repository: Repository<T>,
    pathToProperty: string,
  ): string {
    const regex = this.helper.getRegex();
    const metaData = repository.metadata;
    const propertyType =
      metaData.findColumnWithPropertyName(pathToProperty)?.type;
    if (propertyType instanceof Function)
      return Function.prototype.toString
        .call(propertyType)
        .match(regex.functionName)[1]
        .toLowerCase();
    return propertyType;
  }

  async getEntity<T>(
    value: string,
    repository: Repository<T>,
    pathToProperty: string,
    validationArguments: ValidationArguments,
  ) {
    return repository.findOne({
      where: {
        [pathToProperty || validationArguments.property]: value,
      },
    } as T);
  }

  abstract validate(
    value: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean>;

  defaultMessage(): string {
    return this.message;
  }
}

import {
  ValidatorConstraintInterface,
  isUUID,
  registerDecorator,
} from 'class-validator';
import { DataSource, ObjectLiteral, Repository } from 'typeorm';
import { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';
import { Injectable } from '@nestjs/common';
import { Helper } from '../helper.utils';
import { ClassConstructor } from 'class-transformer';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export abstract class BaseValidator implements ValidatorConstraintInterface {
  protected message: string;

  constructor(@InjectDataSource() private dataSource: DataSource) {}

  protected checkPropertyType(value: string, type: string): boolean {
    switch (type) {
      case 'uuid':
        return isUUID(value, 4);
      default:
        // eslint-disable-next-line valid-typeof
        return typeof value === type;
    }
  }

  protected getRepository(repositoryName: string): Repository<ObjectLiteral> {
    return this.dataSource.getRepository(repositoryName);
  }

  protected getPropertyType<T>(
    repository: Repository<T>,
    pathToProperty: string,
  ): string {
    const regex = Helper.regex;
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

  protected async getEntity<T>(
    value: string,
    repository: Repository<T>,
    pathToProperty: string,
    validationArguments: ValidationArguments,
  ): Promise<T> {
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

  static validator<T>(
    entityClass: ClassConstructor<T>,
    field: string,
    validator: ClassConstructor<BaseValidator>,
  ) {
    return function (object: Record<string, any>, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName,
        constraints: [entityClass, field],
        validator,
      });
    };
  }
}

import { Injectable } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { ValidationArguments, ValidatorConstraint } from 'class-validator';
import { BaseValidatorProperty } from 'src/config/config.constants';
import { BaseValidator } from 'src/utils/base/base.validation.utils';
import { DataSource } from 'typeorm';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUniqueValidator extends BaseValidator {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  /**
   * Validate property
   * @param {string} value input by user in request.body
   * @param {ValidationArguments} validationArguments ['your-repository-name'] format
   * @returns {Promise<boolean>} validation result
   */
  async validate(
    value: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const [repositoryName] = validationArguments.constraints;
    const pathToProperty = validationArguments.property;

    const repository = this.getRepository(repositoryName);
    const propertyType = this.getPropertyType(repository, pathToProperty);
    if (!this.checkPropertyType(value, propertyType)) {
      this.message = `Value should be of type ${propertyType}.`;
      return false;
    }

    const entity = await this.getEntity(
      value,
      repository,
      pathToProperty,
      validationArguments,
    );
    this.message = `${pathToProperty} must be unique`;
    return !entity;
  }

  static validator<T>(
    entityClass: ClassConstructor<T>,
    field = BaseValidatorProperty,
    validator = IsUniqueValidator,
  ) {
    return super.validator(entityClass, field, validator);
  }
}

export const IsUnique = IsUniqueValidator.validator;

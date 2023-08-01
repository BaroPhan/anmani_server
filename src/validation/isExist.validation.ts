import { ValidationArguments, ValidatorConstraint } from 'class-validator';
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseValidator } from 'src/utils/base/base.validation.utils';
import { BaseValidatorProperty } from 'src/config/config.constants';
import { ClassConstructor } from 'class-transformer';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsExistValidator extends BaseValidator {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  /**
   * Validate property
   * @param {string} value input by user in request.body
   * @param {ValidationArguments} validationArguments ['your-repository-name', 'property-name'] format
   * @returns {Promise<boolean>} validation result
   */
  async validate(
    value: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    if (!value) {
      this.message = 'Value must be provided.';
      return false;
    }
    const [repositoryName, pathToProperty] = validationArguments.constraints;
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
    this.message = `${repositoryName.name} not found with ${
      pathToProperty || validationArguments.property
    } = ${value}.`;
    return !!entity;
  }

  static validator<T>(
    entityClass: ClassConstructor<T>,
    field = BaseValidatorProperty,
    validator = IsExistValidator,
  ) {
    return super.validator(entityClass, field, validator);
  }
}

export const IsExist = IsExistValidator.validator;

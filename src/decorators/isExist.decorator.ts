import { ValidationArguments, ValidatorConstraint } from 'class-validator';
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseValidator } from 'src/utils/base/base.validation.utils';
import { BaseValidatorProperty } from 'src/config/config.constants';
import { ClassConstructor } from 'class-transformer';
import { Helper } from 'src/utils/helper.utils';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsExistValidator extends BaseValidator {
  constructor(dataSource: DataSource, private readonly helper: Helper) {
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
    const [repositoryName, pathToProperty] = validationArguments.constraints;
    const repository = this.getRepository(repositoryName);
    const propertyType = this.getPropertyType(repository, pathToProperty);

    for (const elem of this.helper.toArr<string>(value)) {
      if (!this.checkPropertyType(elem, propertyType)) {
        this.message = `Value should be of type ${propertyType}.`;
        return false;
      }
      const entity = await this.getEntity(
        elem,
        repository,
        pathToProperty,
        validationArguments,
      );
      if (!entity) {
        this.message = `${repositoryName.name} not found with ${
          pathToProperty || validationArguments.property
        } = ${elem}.`;
        return false;
      }
    }
    return true;
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

import { ValidatorConstraint } from 'class-validator';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';
import { Injectable } from '@nestjs/common';
import { BaseValidator } from 'src/utils/base/base.validation.utils';
import { Helper } from 'src/utils/helper.utils';

@Injectable()
@ValidatorConstraint({ name: 'IsExist', async: true })
export class IsExist extends BaseValidator {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    protected helper: Helper,
  ) {
    super(helper);
  }

  async validate(
    value: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    if (!value) {
      this.message = 'Value must be provided.';
      return false;
    }
    const repositoryName = validationArguments.constraints[0];
    const repository = this.dataSource.getRepository(repositoryName);
    const pathToProperty = validationArguments.constraints[1];
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
    this.message = `${repositoryName} not found with ${
      pathToProperty || validationArguments.property
    } = ${value}.`;
    return !!entity;
  }
}

import { Module } from '@nestjs/common';
import { IsExist } from './validation.utils';

@Module({
  providers: [IsExist], // Add the IsExist class to the providers of this module
  exports: [IsExist], // Export the IsExist class to make it available for other modules
})
export class ValidationModule {}

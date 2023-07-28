import { Module } from '@nestjs/common';
import { IsExist } from './properties.validation';

@Module({
  providers: [IsExist],
  exports: [IsExist],
})
export class ValidationModule {}

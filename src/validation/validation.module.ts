import { Module } from '@nestjs/common';
import { IsExist } from './properties.validation';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [UtilsModule],
  providers: [IsExist],
  exports: [IsExist],
})
export class ValidationModule {}

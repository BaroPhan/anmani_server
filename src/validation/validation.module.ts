import { Module } from '@nestjs/common';
import { IsExistValidator } from './isExist.validation';
import { UtilsModule } from 'src/utils/utils.module';
import { IsUniqueValidator } from './isUnique.validation';

@Module({
  imports: [UtilsModule],
  providers: [IsExistValidator, IsUniqueValidator],
  exports: [IsExistValidator, IsUniqueValidator],
})
export class ValidationModule {}

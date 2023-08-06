import { Module } from '@nestjs/common';
import { IsExistValidator } from './isExist.decorator';
import { UtilsModule } from 'src/utils/utils.module';
import { IsUniqueValidator } from './isUnique.decorator';

@Module({
  imports: [UtilsModule],
  providers: [IsExistValidator, IsUniqueValidator],
  exports: [IsExistValidator, IsUniqueValidator],
})
export class DecoratorModule {}

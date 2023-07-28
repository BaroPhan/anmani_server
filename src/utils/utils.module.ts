import { Module } from '@nestjs/common';
import { Helper } from './helper.utils';

@Module({
  providers: [Helper],
  exports: [Helper],
})
export class UtilsModule {}

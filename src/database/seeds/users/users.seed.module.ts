import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersSeedService } from './users.seed.service';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersSeedService],
  exports: [UsersSeedService],
})
export class UsersSeedModule {}

import {
  ApiProperty,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { QueryDTO } from 'src/utils/helper.utils';
import { User, queryUserDTO } from '../entities/user.entity';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class QueryUserDto extends PartialType(
  IntersectionType(QueryDTO, PickType(User, queryUserDTO)),
) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsIn(queryUserDTO)
  sort: string;
}

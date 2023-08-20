import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { QueryDTO } from 'src/utils/helper.utils';
import { User, queryUserDTO } from '../entities/user.entity';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { ApiPropertyEnum } from 'src/decorators/swagger.decorator';

export class QueryUserDto extends PartialType(
  IntersectionType(QueryDTO, PickType(User, queryUserDTO)),
) {
  @ApiPropertyEnum(queryUserDTO, { required: false })
  @IsOptional()
  @IsString()
  @IsIn(queryUserDTO)
  sort: string;
}

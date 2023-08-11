import {
  ApiProperty,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { QueryDTO } from 'src/utils/helper.utils';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { Video, queryVideoDto } from '../entities/video.entity';

export class QueryVideoDto extends PartialType(
  IntersectionType(QueryDTO, PickType(Video, queryVideoDto)),
) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsIn(queryVideoDto)
  sort: string;
}

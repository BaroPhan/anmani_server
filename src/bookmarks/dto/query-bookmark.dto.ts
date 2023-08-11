import {
  ApiProperty,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { Bookmark, createBookmarkDTO } from '../entities/bookmark.entity';
import { QueryDTO } from 'src/utils/helper.utils';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class QueryBookmarkDto extends PartialType(
  IntersectionType(QueryDTO, PickType(Bookmark, createBookmarkDTO)),
) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsIn(createBookmarkDTO)
  sort: string;
}

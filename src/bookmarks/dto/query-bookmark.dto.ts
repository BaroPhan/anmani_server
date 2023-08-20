import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { Bookmark, createBookmarkDTO } from '../entities/bookmark.entity';
import { QueryDTO } from 'src/utils/helper.utils';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { ApiPropertyEnum } from 'src/decorators/swagger.decorator';

export class QueryBookmarkDto extends PartialType(
  IntersectionType(QueryDTO, PickType(Bookmark, createBookmarkDTO)),
) {
  @ApiPropertyEnum(createBookmarkDTO, { required: false })
  @IsOptional()
  @IsString()
  @IsIn(createBookmarkDTO)
  sort: string;
}

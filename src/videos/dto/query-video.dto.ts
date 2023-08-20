import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { QueryDTO } from 'src/utils/helper.utils';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { Video, queryVideoDto } from '../entities/video.entity';
import { ApiPropertyEnum } from 'src/decorators/swagger.decorator';

export class QueryVideoDto extends PartialType(
  IntersectionType(QueryDTO, PickType(Video, queryVideoDto)),
) {
  @ApiPropertyEnum(queryVideoDto, { required: false })
  @IsOptional()
  @IsString()
  @IsIn(queryVideoDto)
  sort: string;
}

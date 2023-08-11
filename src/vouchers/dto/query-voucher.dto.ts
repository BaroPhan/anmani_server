import {
  ApiProperty,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { Voucher, createVoucherDTO } from '../entities/voucher.entity';
import { QueryDTO } from 'src/utils/helper.utils';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class QueryVoucherDto extends PartialType(
  IntersectionType(QueryDTO, PickType(Voucher, createVoucherDTO)),
) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsIn(createVoucherDTO)
  sort: string;
}

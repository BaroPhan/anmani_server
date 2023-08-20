import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { Voucher, createVoucherDTO } from '../entities/voucher.entity';
import { QueryDTO } from 'src/utils/helper.utils';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { ApiPropertyEnum } from 'src/decorators/swagger.decorator';

export class QueryVoucherDto extends PartialType(
  IntersectionType(QueryDTO, PickType(Voucher, createVoucherDTO)),
) {
  @ApiPropertyEnum(createVoucherDTO, { required: false })
  @IsOptional()
  @IsString()
  @IsIn(createVoucherDTO)
  sort: string;
}

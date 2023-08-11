import { PickType } from '@nestjs/swagger';
import { Voucher, createVoucherDTO } from '../entities/voucher.entity';

export class CreateVoucherDto extends PickType(Voucher, createVoucherDTO) {}

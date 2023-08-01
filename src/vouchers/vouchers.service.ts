import { Injectable } from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { Voucher } from './entities/voucher.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VouchersService {
  constructor(
    @InjectRepository(Voucher)
    private readonly voucherRepository: Repository<Voucher>,
  ) {}

  create(createVoucherDto: CreateVoucherDto) {
    return this.voucherRepository.save(
      this.voucherRepository.create(createVoucherDto),
    );
  }

  findAll() {
    return this.voucherRepository.find();
  }

  findOne(id: string) {
    return this.voucherRepository.findOne({ where: { id } });
  }

  update(id: string, updateVoucherDto: UpdateVoucherDto) {
    return this.voucherRepository.update(id, updateVoucherDto);
  }

  remove(id: string) {
    return this.voucherRepository.delete(id);
  }
}

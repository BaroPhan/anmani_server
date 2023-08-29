import { Injectable } from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { Voucher } from './entities/voucher.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryVoucherDto } from './dto/query-voucher.dto';

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

  findAll(queryVoucherDto: QueryVoucherDto) {
    const { page, limit, sort, order, ...query } = queryVoucherDto;
    return this.voucherRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      where: query,
      order: { [sort]: order },
    });
  }

  findByProductId(productType: string) {
    return this.voucherRepository.findBy({ productType });
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

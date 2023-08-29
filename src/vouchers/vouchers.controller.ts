import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/decorators/isPublic.decorator';
import { QueryVoucherDto } from './dto/query-voucher.dto';

@Controller({ path: 'vouchers', version: '1' })
@ApiTags('vouchers')
export class VouchersController {
  constructor(private readonly vouchersService: VouchersService) {}

  @Post()
  create(@Body() createVoucherDto: CreateVoucherDto) {
    return this.vouchersService.create(createVoucherDto);
  }

  @IsPublic()
  @Get()
  findAll(@Query() queryVoucherDto: QueryVoucherDto) {
    return this.vouchersService.findAll(queryVoucherDto);
  }

  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vouchersService.findOne(id);
  }

  @Get('product/:type')
  findByProductType(@Param('type') productType: string) {
    return this.vouchersService.findByProductId(productType);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVoucherDto: UpdateVoucherDto) {
    return this.vouchersService.update(id, updateVoucherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vouchersService.remove(id);
  }
}

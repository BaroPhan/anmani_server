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
import { QueryUserDto } from 'src/users/dto/query-user.dto';
import { IsPublic } from 'src/decorators/isPublic.decorator';

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
  findAll(@Query() queryUserDto: QueryUserDto) {
    return this.vouchersService.findAll(queryUserDto);
  }

  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vouchersService.findOne(id);
  }

  @Get('product/:id')
  findByProductId(@Param('id') productId: string) {
    return this.vouchersService.findByProductId(productId);
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

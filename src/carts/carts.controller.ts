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
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiTags } from '@nestjs/swagger';
import { QueryCartDto } from './dto/query-cart.dto';

@Controller({ path: 'carts', version: '1' })
@ApiTags('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartsService.create(createCartDto);
  }

  @Get()
  findAll(@Query() queryCartDto: QueryCartDto) {
    return this.cartsService.findAll(queryCartDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartsService.findOne(id);
  }

  @Get('user/:id')
  findByUserId(@Param('id') userId: string) {
    return this.cartsService.findByUserId(userId);
  }

  @Get('product/:id')
  findByProductId(@Param('id') productId: string) {
    return this.cartsService.findByProductId(productId);
  }

  @Patch()
  update(@Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartsService.remove(id);
  }
}

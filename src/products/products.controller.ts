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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { QueryProductDto } from './dto/query-product.dto';
import { IsPublic, Roles } from 'src/decorators/isPublic.decorator';
import { Product } from './entities/product.entity';
import { RolesEnum } from 'src/guards/role.guards';

@Controller({ path: 'products', version: '1' })
@ApiTags('products')
@Roles(RolesEnum.ADMIN)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @IsPublic()
  @Get()
  findAll(@Query() queryProductDto: QueryProductDto) {
    return this.productsService.findAll(queryProductDto);
  }

  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product | any> {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}

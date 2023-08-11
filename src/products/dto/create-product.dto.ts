import { PickType } from '@nestjs/swagger';
import { Product, createProductDTO } from '../entities/product.entity';

export class CreateProductDto extends PickType(Product, createProductDTO) {}

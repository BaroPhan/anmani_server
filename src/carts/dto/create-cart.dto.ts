import { PickType } from '@nestjs/swagger';
import { Cart, createCartDTO } from '../entities/cart.entity';

export class CreateCartDto extends PickType(Cart, createCartDTO) {}

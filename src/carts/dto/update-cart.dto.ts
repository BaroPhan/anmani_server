import { PickType } from '@nestjs/swagger';
import { Cart, createCartDTO } from '../entities/cart.entity';

export class UpdateCartDto extends PickType(Cart, createCartDTO) {}

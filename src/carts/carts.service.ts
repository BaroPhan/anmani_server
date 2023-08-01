import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  create(createCartDto: CreateCartDto) {
    return this.cartRepository.save(this.cartRepository.create(createCartDto));
  }

  findAll() {
    return this.cartRepository.find();
  }

  findOne(id: string) {
    return this.cartRepository.findOne({ where: { userId: id } });
  }

  update(id: string, updateCartDto: UpdateCartDto) {
    return this.cartRepository.update(id, updateCartDto);
  }

  remove(id: string) {
    return this.cartRepository.delete({ userId: id });
  }
}

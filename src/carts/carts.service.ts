import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto, UpdateManyCartsDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryCartDto } from './dto/query-cart.dto';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  create(createCartDto: CreateCartDto) {
    return this.cartRepository.save(this.cartRepository.create(createCartDto));
  }

  findAll(queryCartDto: QueryCartDto) {
    const { page, limit, sort, order, ...query } = queryCartDto;
    return this.cartRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      where: query,
      order: { [sort]: order },
    });
  }

  findOne(id: string) {
    return this.cartRepository.findOne({ where: { userId: id } });
  }

  findByUserId(userId: string) {
    return this.cartRepository.findBy({ userId });
  }

  findByProductId(productId: string) {
    return this.cartRepository.findBy({ productId });
  }

  update(updateCartDto: UpdateCartDto) {
    const { userId, productId, ...data } = updateCartDto;
    return this.cartRepository.update({ userId, productId }, data);
  }

  async updateMany(updateCartsDto: UpdateManyCartsDto) {
    const { userId, products } = updateCartsDto;
    const res = [];
    for (const { productId, ...data } of products) {
      res.push(await this.cartRepository.update({ userId, productId }, data));
    }
    return res;
  }

  remove(id: string) {
    return this.cartRepository.delete({ userId: id });
  }
}

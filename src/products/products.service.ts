import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, JsonContains, Repository } from 'typeorm';
import { QueryProductDto } from './dto/query-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.productRepository.save(
      this.productRepository.create(createProductDto),
    );
  }

  async findAll(queryProductDto: QueryProductDto) {
    const {
      page,
      limit,
      sort,
      order,
      price,
      location: locaionMain,
      investor: investorName,
      ...query
    } = queryProductDto;
    let from: number;
    let to: number;
    if (price) [from, to] = price.match(/\d+/g)?.map(Number);

    const data = await this.productRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        ...query,
        ...(investorName && { investor: JsonContains({ name: investorName }) }),
        ...(locaionMain && { location: JsonContains({ main: locaionMain }) }),
        ...(from && to && { price: Between(from, to) }),
      },
      order: { [sort]: order },
    });
    return data;
  }

  findOne(id: string) {
    return this.productRepository.findOne({ where: { id } });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(id, updateProductDto);
  }

  remove(id: string) {
    return this.productRepository.delete(id);
  }
}

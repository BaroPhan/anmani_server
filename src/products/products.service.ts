import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, JsonContains, Not, Repository } from 'typeorm';
import { QueryProductDto } from './dto/query-product.dto';
import { ConfigService } from '@nestjs/config';
import { ConfigName } from 'src/config/config.constants';
import { ProductVariables } from 'src/config/configs/product.config';

@Injectable()
export class ProductsService {
  protected readonly productVariables: ProductVariables;

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    protected configService: ConfigService,
  ) {
    this.productVariables = this.configService.getOrThrow(ConfigName.PRODUCT, {
      infer: true,
    });
  }

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

  async findOne(id: string): Promise<Product | any> {
    await this.increaseView(id);
    const product = await this.productRepository.findOneBy({ id });
    const suggestions = (
      await this.productRepository.findBy({
        id: Not(product.id),
        type: product.type,
      })
    )
      .sort(({ projectName: projectNameA }, { projectName: projectNameB }) => {
        if (projectNameA === product.projectName) {
          return -1;
        }
        if (projectNameB === product.projectName) {
          return 1;
        }
        return 0;
      })
      .slice(0, this.productVariables.DEFAULT_PRODUCT_SUGGESTION_LENGTH);
    return { ...product, suggestions };
  }

  increaseView(id: string) {
    return this.productRepository.update(id, { view: () => 'view + 1' });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(id, updateProductDto);
  }

  remove(id: string) {
    return this.productRepository.delete(id);
  }
}

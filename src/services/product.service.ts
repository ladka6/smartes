import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@smartex/schema';
import {
  CraeteProductRequest,
  CraeteProductResponse,
  ListAllResponse,
  FilterProductResponse,
  ChangeProductRequest,
  ChangeProductResponse,
  ProductDTO,
} from '../request';
import { DeepPartial, FindManyOptions, Repository } from 'typeorm';
import { CategoryService } from './category.service';
import * as validator from 'class-validator';
import * as transfrom from 'class-transformer';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoryService: CategoryService,
  ) {}

  public async changeProduct(
    payload: ChangeProductRequest,
  ): Promise<ChangeProductResponse> {
    const { data, productId } = payload;
    //validate the data
    let product = await this.findOneById(productId);

    if (!product) {
      throw new Error('product does not exists');
    }

    product = (await this.productRepository.update({ id: productId }, data))
      .affected[0];

    const res = transfrom.plainToInstance(ProductDTO, product);
    return { product: res };
  }

  public async filter(
    name?: string,
    category?: string,
  ): Promise<FilterProductResponse> {
    const filterOptions: FindManyOptions<Product> = {};

    if (name) {
      filterOptions.where = { title: name };
    }

    if (category) {
      filterOptions.where = { ...filterOptions.where, category: { category } };
    }

    const [products, count] =
      await this.productRepository.findAndCount(filterOptions);

    const res = products.map((product) => {
      return transfrom.plainToInstance(ProductDTO, product);
    });

    return {
      data: res,
      count: count,
    };
  }

  public async changeCategory(productId: string, data: { category: string }) {
    const product = await this.findOneById(productId);
    if (!product) {
      throw new Error('product does not exists');
    }

    const category = await this.categoryService.findOrGenerate(data.category);
    product.category = category;
    //transform
    const res = transfrom.plainToInstance(ProductDTO, product);
    return { product: res };
  }

  public async createProduct(
    product: CraeteProductRequest,
  ): Promise<CraeteProductResponse> {
    try {
      validator.validateOrReject(product);

      //Create category if not exists
      const category = await this.categoryService.createCategory(
        product.category,
      );

      const newProduct = await this.generate({
        title: product.title,
        category: { id: category.id, category: category.category },
        description: product.description,
        price: product.price,
      });

      const newProductRes = transfrom.plainToInstance(Product, newProduct);
      const res = transfrom.plainToInstance(
        CraeteProductRequest,
        newProductRes,
      );

      return { created: true, product: res as ProductDTO };
    } catch (error) {
      throw error;
    }
  }
  public async listAll(): Promise<ListAllResponse> {
    const products = await this.all();
    const res = products.map((product) => {
      return transfrom.plainToInstance(ProductDTO, product);
    });
    return { products: res };
  }

  public async deleteProduct(id: string) {
    await this.delete(id);
    return { deleted: true };
  }

  private async generate(data: DeepPartial<Product>) {
    let product = this.productRepository.create(data);
    product = await this.productRepository.save(product);
    return product;
  }

  private async all() {
    const products: Product[] = await this.productRepository.find();
    return products;
  }

  private async findOneById(id: string) {
    return this.productRepository.findOne({ where: { id } });
  }

  private async delete(id: string) {
    return this.productRepository.delete(id);
  }
}

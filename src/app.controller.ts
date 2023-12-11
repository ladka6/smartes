import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Get,
  Query,
  Delete,
} from '@nestjs/common';
import {
  CraeteProductRequest,
  CraeteProductResponse,
  ListAllResponse,
} from './request';
import { ProductService } from './services/product.service';

@Controller('/app')
export class AppController {
  constructor(private readonly productService: ProductService) {}

  @Post('/create')
  async createProduct(
    @Body() data: CraeteProductRequest,
  ): Promise<CraeteProductResponse> {
    return this.productService.createProduct(data);
  }

  @Patch('category/:id')
  async changeCategoryOfProduct(
    @Body() data: { category: string },
    @Param('id') productId: string,
  ) {
    return this.productService.changeCategory(productId, data);
  }

  @Get('/all')
  async listAll(): Promise<ListAllResponse> {
    return this.productService.listAll();
  }

  @Get('/list')
  async filter(
    @Query('name') name: string,
    @Query('category') category: string,
  ) {
    return this.productService.filter(name, category);
  }

  @Patch('product/:id')
  async changeProduct(@Body() data: object, @Param('id') productId: string) {
    return this.productService.changeProduct({ productId, data });
  }

  @Delete('product/:id')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}

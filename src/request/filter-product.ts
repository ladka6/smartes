import { ProductDTO } from './product-dto';

export class FilterProductResponse {
  data: ProductDTO[];
  count: number;
}

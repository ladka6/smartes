import { ProductDTO } from './product-dto';

export class CraeteProductRequest {
  title: string;
  description: string;
  price: number;
  category: string;
}
export class CraeteProductResponse {
  created: boolean;
  product: ProductDTO;
}

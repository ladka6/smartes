import { ProductDTO } from './product-dto';

export class ChangeProductData {
  title?: string;
  description?: string;
  price?: number;
}

export class ChangeProductRequest {
  productId: string;
  data: ChangeProductData;
}

export class ChangeProductResponse {
  product: ProductDTO;
}

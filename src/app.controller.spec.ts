import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { ProductService } from './services/product.service';
import {
  ChangeProductResponse,
  CraeteProductResponse,
  FilterProductResponse,
  ListAllResponse,
} from './request';
import { ProductDTO } from './request/product-dto';

describe('AppController', () => {
  let appController: AppController;
  let productService: ProductService;
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [ProductService],
    }).compile();

    appController = app.get<AppController>(AppController);
    productService = app.get<ProductService>(ProductService);
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const createProductRequest = {
        title: 'Title1',
        description: 'Description',
        price: 10,
        category: 'Category1',
      };

      const mockCreateProductResponse: CraeteProductResponse = {
        created: true,
        product: {
          title: 'Title1',
          description: 'Description',
          price: 10,
          category: 'Category1',
        },
      };
      jest
        .spyOn(productService, 'createProduct')
        .mockImplementation(() => Promise.resolve(mockCreateProductResponse));

      const result = await appController.createProduct(createProductRequest);

      expect(result).toEqual(mockCreateProductResponse);
      expect(productService.createProduct).toHaveBeenCalledWith(
        createProductRequest,
      );
    });
  });

  describe('changeCategoryOfProduct', () => {
    it('should change the category of a product', async () => {
      const productId = 'exampleProductId';
      const requestData = { category: 'newCategory' };

      // Assuming you have a mock productDTO with the correct structure
      const mockProductDTO: ProductDTO = {
        title: 'string',
        description: 'string',
        price: 10, // assuming a number, not a string
        category: 'newCategory',
      };

      jest
        .spyOn(productService, 'changeCategory')
        .mockImplementation(() => Promise.resolve({ product: mockProductDTO }));

      const result = await appController.changeCategoryOfProduct(
        requestData,
        productId,
      );

      expect(result).toEqual({ product: mockProductDTO });
      expect(productService.changeCategory).toHaveBeenCalledWith(
        productId,
        requestData,
      );
    });
  });

  describe('listAll', () => {
    it('should list all products', async () => {
      const mockListAllResponse: ListAllResponse = {
        products: [
          {
            title: 'string',
            description: 'string',
            price: 10,
            category: 'string',
          },
        ],
      };

      jest
        .spyOn(productService, 'listAll')
        .mockImplementation(() => Promise.resolve(mockListAllResponse));

      const result = await appController.listAll();

      expect(result).toEqual(mockListAllResponse);
      expect(productService.listAll).toHaveBeenCalled();
    });
  });

  describe('filter', () => {
    it('should filter products', async () => {
      const query = { name: 'exampleName', category: 'exampleCategory' };

      // Assuming you have a mock FilterProductResponse with the correct structure
      const mockFilterProductResponse: FilterProductResponse = {
        data: [
          {
            title: 'string',
            description: 'string',
            price: 10, // assuming a number, not a string
            category: 'exampleCategory',
          },
          // add more product entries if needed
        ],
        count: 1, // assuming 1 for simplicity, adjust based on your actual count
      };

      jest
        .spyOn(productService, 'filter')
        .mockImplementation(() => Promise.resolve(mockFilterProductResponse));

      const result = await appController.filter(query.name, query.category);

      expect(result).toEqual(mockFilterProductResponse);
      expect(productService.filter).toHaveBeenCalledWith(
        query.name,
        query.category,
      );
    });
  });

  describe('changeProduct', () => {
    it('should change a product', async () => {
      const productId = 'exampleProductId';
      const requestData = {
        /* your test data */
      };

      // Assuming you have a mock ChangeProductResponse with the correct structure
      const mockChangeProductResponse: ChangeProductResponse = {
        product: {
          title: 'string',
          description: 'string',
          price: 10, // assuming a number, not a string
          category: 'exampleCategory',
        },
      };

      jest
        .spyOn(productService, 'changeProduct')
        .mockImplementation(() => Promise.resolve(mockChangeProductResponse));

      const result = await appController.changeProduct(requestData, productId);

      expect(result).toEqual(mockChangeProductResponse);
      expect(productService.changeProduct).toHaveBeenCalledWith(
        productId,
        requestData,
      );
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product', async () => {
      const productId = 'exampleProductId';

      // Assuming a successful deletion would return an object with a 'deleted' property set to true
      const mockDeleteProductResponse = { deleted: true };

      jest
        .spyOn(productService, 'deleteProduct')
        .mockImplementation(() => Promise.resolve(mockDeleteProductResponse));

      const result = await appController.deleteProduct(productId);

      expect(result).toEqual(mockDeleteProductResponse);
      expect(productService.deleteProduct).toHaveBeenCalledWith(productId);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});

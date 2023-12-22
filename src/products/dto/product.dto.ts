import { Category } from 'src/categories/category.entity';
import { Product } from '../product.entity';

export class ProductDTO implements Omit<Product, 'id'> {
  name: string;
  price: number;
  isAvailable: boolean;
  category: Category;
}

export class CreateProductDTO implements Omit<ProductDTO, 'isAvailable'> {
  name: string;
  price: number;
  category: Category;
}

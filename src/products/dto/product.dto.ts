import { Category } from 'src/categories/category.entity';
import { Product } from '../product.entity';

export class ProductDTO implements Omit<Product, 'id'> {
  name: string;
  price: number;
  isAvailable: boolean;
  category: Category;
}

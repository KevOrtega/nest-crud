import { Product } from 'src/products/product.entity';
import { Category } from '../category.entity';

export class CategoryDTO implements Category {
  name: string;
  products: Product[];
}

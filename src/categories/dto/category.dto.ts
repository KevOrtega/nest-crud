import { IsNotEmpty } from 'class-validator';
import { Product } from 'src/products/product.entity';
import { Category } from '../category.entity';

export class CategoryDTO implements Omit<Category, 'id'> {
  @IsNotEmpty()
  name: string;

  products: Product[];
}

export class CreateCategoryDTO implements Omit<CategoryDTO, 'products'> {
  @IsNotEmpty()
  name: string;
}

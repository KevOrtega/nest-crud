import { Category } from 'src/categories/category.entity';
import { Product } from '../product.entity';
import { IsBoolean, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class ProductDTO implements Omit<Product, 'id'> {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;

  @IsBoolean()
  isAvailable: boolean;

  @IsNotEmpty()
  @IsUUID('4')
  category: Category;
}

export class CreateProductDTO implements Omit<ProductDTO, 'isAvailable'> {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsUUID('4')
  category: Category;
}

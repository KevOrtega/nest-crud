import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Product } from 'src/products/product.entity';

@Entity()
export class Category {
  @PrimaryColumn()
  @IsNotEmpty()
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}

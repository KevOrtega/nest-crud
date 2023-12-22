import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsNotEmpty, IsNumber, IsBoolean, IsUUID } from 'class-validator';
import { Category } from 'src/categories/category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNumber()
  price: number;

  @Column({ default: true })
  @IsBoolean()
  isAvailable: boolean;

  @IsNotEmpty()
  @IsUUID('4')
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}

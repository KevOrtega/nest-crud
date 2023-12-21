import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductDTO } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  getProducts(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  getProductById(id: string): Promise<Product | null> {
    return this.productsRepository.findOneBy({ id });
  }

  postProduct(
    newProduct: Omit<ProductDTO, 'isAvailable'>,
  ): Promise<Product | null> {
    const product = {
      isAvailable: true,
      ...newProduct,
    };
    const productCreated = this.productsRepository.create(product);
    return this.productsRepository.save(productCreated);
  }

  async updateProduct(
    id: string,
    data: Partial<ProductDTO>,
  ): Promise<Product | null> {
    const productFound = await this.productsRepository.findOneBy({ id });
    if (!productFound) return null;
    const updatedProduct = this.productsRepository.merge(productFound, data);
    return await this.productsRepository.save(updatedProduct);
  }

  async deleteProduct(id: string): Promise<void> {
    await this.productsRepository.delete(id);
  }
}

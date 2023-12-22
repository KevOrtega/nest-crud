import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDTO, ProductDTO } from './dto/product.dto';
import { validate } from 'class-validator';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  getProducts(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: ['category'],
    });
  }

  getProductById(id: string): Promise<Product> {
    const productFound = this.productsRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!productFound) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return productFound;
  }

  postProduct(newProduct: CreateProductDTO): Promise<Product | null> {
    this.validateProduct(newProduct);
    const product = {
      isAvailable: true,
      ...newProduct,
    };
    const productCreated = this.productsRepository.create(product);
    return this.productsRepository.save(productCreated);
  }

  async updateProduct(id: string, data: Partial<ProductDTO>): Promise<Product> {
    this.validateProduct(data);
    const productFound = await this.getProductById(id);
    const updatedProduct = this.productsRepository.merge(productFound, data);
    return await this.productsRepository.save(updatedProduct);
  }

  async deleteProduct(id: string): Promise<DeleteResult> {
    const deletedProduct = await this.productsRepository.delete(id);
    if (!deletedProduct) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return deletedProduct;
  }

  async validateProduct(category: Partial<ProductDTO>): Promise<void> {
    const errors = await validate(category);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
  }
}

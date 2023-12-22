import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category } from './category.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDTO, CreateCategoryDTO } from './dto/category.dto';
import { validate } from 'class-validator';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  getCategories(): Promise<Category[]> {
    return this.categoriesRepository.find({
      relations: ['category'],
    });
  }

  getCategoryById(id: string): Promise<Category> {
    const foundProduct = this.categoriesRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!foundProduct) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return foundProduct;
  }

  postCategory(newCategory: CreateCategoryDTO): Promise<Category | null> {
    this.validateCategory(newCategory);
    const category = {
      isAvailable: true,
      ...newCategory,
    };
    const categoryCreated = this.categoriesRepository.create(category);
    return this.categoriesRepository.save(categoryCreated);
  }

  async updateCategory(
    id: string,
    data: Partial<CategoryDTO>,
  ): Promise<Category | null> {
    this.validateCategory(data);
    const categoryFound = await this.getCategoryById(id);
    const updatedCategory = this.categoriesRepository.merge(
      categoryFound,
      data,
    );
    return await this.categoriesRepository.save(updatedCategory);
  }

  async deleteCategory(id: string): Promise<DeleteResult> {
    const deletedProduct = await this.categoriesRepository.delete(id);
    if (!deletedProduct) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return deletedProduct;
  }

  async validateCategory(category: Partial<CategoryDTO>): Promise<void> {
    const errors = await validate(category);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
  }
}

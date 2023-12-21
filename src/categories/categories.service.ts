import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDTO } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  getCategories(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  getCategoryByName(name: string): Promise<Category | null> {
    return this.categoriesRepository.findOneBy({ name });
  }

  postCategory(
    newCategory: Omit<CategoryDTO, 'products'>,
  ): Promise<Category | null> {
    const category = {
      isAvailable: true,
      ...newCategory,
    };
    const categoryCreated = this.categoriesRepository.create(category);
    return this.categoriesRepository.save(categoryCreated);
  }

  async updateCategory(
    name: string,
    data: Partial<CategoryDTO>,
  ): Promise<Category | null> {
    const categoryFound = await this.categoriesRepository.findOneBy({ name });
    if (!categoryFound) return null;
    const updatedCategory = this.categoriesRepository.merge(
      categoryFound,
      data,
    );
    return await this.categoriesRepository.save(updatedCategory);
  }

  async deleteCategory(name: string): Promise<void> {
    await this.categoriesRepository.delete(name);
  }
}

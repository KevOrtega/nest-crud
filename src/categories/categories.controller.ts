import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDTO } from './dto/category.dto';
import { validate } from 'class-validator';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @Post()
  async postCategory(@Body() category: Omit<CategoryDTO, 'products'>) {
    const errors = await validate(category);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return this.categoriesService.postCategory(category);
  }

  @Put(':id')
  async updateCategory(@Param('id') id: string, @Body() category: CategoryDTO) {
    const errors = await validate(category);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return this.categoriesService.updateCategory(id, category);
  }

  @Patch(':id')
  async updatePartialCategory(
    @Param('id') id: string,
    @Body() category: Partial<CategoryDTO>,
  ) {
    const errors = await validate(category);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return this.categoriesService.updateCategory(id, category);
  }

  @Delete(':name')
  deleteCategory(@Param('id') name: string) {
    this.categoriesService.deleteCategory(name);
  }
}

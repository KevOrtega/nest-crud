import {
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
import { CategoryDTO, CreateCategoryDTO } from './dto/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @Get(':id')
  getCategoryById(@Param('id') id: string) {
    return this.categoriesService.getCategoryById(id);
  }

  @Post()
  async postCategory(@Body() category: CreateCategoryDTO) {
    return this.categoriesService.postCategory(category);
  }

  @Put(':id')
  async updateCategory(@Param('id') id: string, @Body() category: CategoryDTO) {
    return this.categoriesService.updateCategory(id, category);
  }

  @Patch(':id')
  async updatePartialCategory(
    @Param('id') id: string,
    @Body() category: Partial<CategoryDTO>,
  ) {
    return this.categoriesService.updateCategory(id, category);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(id);
  }
}

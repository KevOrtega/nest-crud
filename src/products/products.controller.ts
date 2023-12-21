import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  BadRequestException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDTO } from './dto/product.dto';
import { validate } from 'class-validator';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @Post()
  async postProducts(@Body() product: Omit<ProductDTO, 'isAvailable'>) {
    const errors = await validate(product);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return this.productsService.postProduct(product);
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() product: ProductDTO) {
    const errors = await validate(product);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return this.productsService.updateProduct(id, product);
  }

  @Patch(':id')
  async updatePartialProduct(
    @Param('id') id: string,
    @Body() product: Partial<ProductDTO>,
  ) {
    const errors = await validate(product);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return this.productsService.updateProduct(id, product);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    this.productsService.deleteProduct(id);
  }
}

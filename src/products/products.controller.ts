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
import { ProductsService } from './products.service';
import { CreateProductDTO, ProductDTO } from './dto/product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @Post()
  async postProducts(@Body() product: CreateProductDTO) {
    return this.productsService.postProduct(product);
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() product: ProductDTO) {
    return this.productsService.updateProduct(id, product);
  }

  @Patch(':id')
  async updatePartialProduct(
    @Param('id') id: string,
    @Body() product: Partial<ProductDTO>,
  ) {
    return this.productsService.updateProduct(id, product);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}

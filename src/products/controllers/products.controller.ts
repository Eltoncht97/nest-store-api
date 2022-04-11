import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';
import { ProductsService } from '../services/products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: number,
  ) {
    // return {
    //   message: `products limit: ${limit}, offset: ${offset}, brand: ${brand} `,
    // };
    return {
      products: this.productsService.findAll(),
    };
  }

  @Get('filter')
  getProductFilter() {
    return `Soy un filtro y estoy encima para que no choque con la ruta de abajo`;
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('productId', ParseIntPipe) productId: number) {
    return {
      message: `product ${productId}`,
      product: this.productsService.findOne(productId),
    };
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    // return {
    //   message: 'Accion de crear',
    //   payload,
    // };
    const newProduct = this.productsService.create(payload);
    return {
      product: newProduct,
    };
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return {
      id,
      product: this.productsService.update(id, payload),
    };
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    this.productsService.delete(id);
    return {
      id,
    };
  }
}

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
import { AuthGuard } from '@nestjs/passport';

import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from '../dtos/products.dtos';
import { ProductsService } from '../services/products.service';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';
import { RolesGuard } from '../../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Public()
  @Get()
  async getProducts(@Query() params: FilterProductsDto) {
    const products = await this.productsService.findAll(params);
    return {
      products,
    };
  }

  @Get('filter')
  getProductFilter() {
    return `Soy un filtro y estoy encima para que no choque con la ruta de abajo`;
  }

  @Public()
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  async getProduct(@Param('productId', MongoIdPipe) productId: string) {
    const product = await this.productsService.findOne(productId);
    return {
      message: `product ${productId}`,
      product,
    };
  }

  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() payload: CreateProductDto) {
    const newProduct = await this.productsService.create(payload);
    return {
      product: newProduct,
    };
  }

  @Put(':id')
  async update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    return {
      id,
      product: await this.productsService.update(id, payload),
    };
  }

  @Delete(':id')
  async remove(@Param('id', MongoIdPipe) id: string) {
    await this.productsService.delete(id);
    return {
      id,
    };
  }
}

import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Body,
} from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dtos';
import { CategoriesService } from '../services/categories.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get(':categoryId/products/:productId')
  getCategory(
    @Param('categoryId') categoryId: string,
    @Param('productId') productId: string,
  ) {
    return `category ${categoryId}, product ${productId}`;
  }

  @ApiOperation({ summary: 'Get all categories' })
  @Get()
  async findAll() {
    return await this.categoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', MongoIdPipe) id: string) {
    return await this.categoriesService.findOne(id);
  }

  @Post()
  async create(@Body() payload: CreateCategoryDto) {
    const newCategory = await this.categoriesService.create(payload);
    return {
      category: newCategory,
    };
  }

  @Put(':id')
  async update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateCategoryDto,
  ) {
    return {
      id,
      product: this.categoriesService.update(id, payload),
    };
  }

  @Delete(':id')
  async remove(@Param('id', MongoIdPipe) id: string) {
    this.categoriesService.remove(id);
    return {
      id,
    };
  }
}

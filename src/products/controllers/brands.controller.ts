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
import { ApiTags } from '@nestjs/swagger';
import { BrandsService } from '../services/brands.service';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dtos';
import { MongoIdPipe } from '../../common/mongo-id.pipe';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  async findAll() {
    return await this.brandsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', MongoIdPipe) id: string) {
    return await this.brandsService.findOne(id);
  }

  @Post()
  async create(@Body() payload: CreateBrandDto) {
    const newProduct = await this.brandsService.create(payload);
    return {
      product: newProduct,
    };
  }

  @Put(':id')
  async update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateBrandDto,
  ) {
    return {
      id,
      product: await this.brandsService.update(id, payload),
    };
  }

  @Delete(':id')
  async remove(@Param('id', MongoIdPipe) id: string) {
    await this.brandsService.remove(id);
    return {
      id,
    };
  }
}

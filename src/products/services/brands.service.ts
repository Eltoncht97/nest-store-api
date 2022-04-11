import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dtos';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class BrandsService {
  private counterId = 1;
  private brands: Brand[] = [
    {
      id: 1,
      name: 'Brand 1',
      image: 'www.123.com',
    },
  ];

  findAll() {
    return this.brands;
  }

  findOne(id: number) {
    return this.brands.find((item) => item.id === id);
  }

  create(payload: CreateBrandDto) {
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.brands.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateBrandDto) {
    const brand = this.findOne(id);

    if (!brand) {
      return new NotFoundException(`Brand #${id} not found`);
    }
    const index = this.brands.findIndex((item) => item.id === id);
    this.brands[index] = {
      ...brand,
      ...payload,
    };
    return this.brands[index];
  }

  remove(id: number) {
    const brand = this.findOne(id);

    if (!brand) {
      return new NotFoundException(`Brand #${id} not found`);
    }
    this.brands.filter((item) => item.id !== id);
    return brand;
  }
}

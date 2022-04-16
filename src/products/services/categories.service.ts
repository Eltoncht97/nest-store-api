import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dtos';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async findAll() {
    return await this.categoryModel.find().exec();
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async create(data: CreateCategoryDto) {
    const newCategory = new this.categoryModel(data);
    return newCategory.save();
  }

  async update(id: string, payload: UpdateCategoryDto) {
    const category = await this.categoryModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async remove(id: string) {
    return await this.categoryModel.findByIdAndDelete(id).exec();
  }
}

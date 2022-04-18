import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';
import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';
import { ProductsService } from '../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configSerive: ConfigService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  // findAll() {
  //   const apiKey = this.configSerive.get('API_KEY');
  //   const dbName = this.configSerive.get('DB_NAME');
  //   console.log({ apiKey, dbName });
  //   return this.users;
  // }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    const newUser = new this.userModel(data);
    return newUser.save();
  }

  async update(id: string, payload: UpdateUserDto) {
    const user = await this.userModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id).exec();
  }

  async getOrdersByUser(id: string) {
    const user = this.findOne(id);

    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }
}

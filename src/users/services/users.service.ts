import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';
import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';
import { ProductsService } from '../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configSerive: ConfigService,
  ) {}

  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      email: 'elton@email.com',
      password: '12345678',
      role: 'ADMIN',
    },
  ];

  findAll() {
    const apiKey = this.configSerive.get('API_KEY');
    const dbName = this.configSerive.get('DB_NAME');
    console.log({ apiKey, dbName });
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((item) => item.id === id);
  }

  create(payload: CreateUserDto) {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, payload: UpdateUserDto) {
    const user = this.findOne(id);

    if (!user) {
      return new NotFoundException(`User #${id} not found`);
    }
    const index = this.users.findIndex((item) => item.id === id);
    this.users[index] = {
      ...user,
      ...payload,
    };
    return this.users[index];
  }

  remove(id: number) {
    const user = this.findOne(id);

    if (!user) {
      return new NotFoundException(`User #${id} not found`);
    }
    this.users.filter((item) => item.id !== id);
    return user;
  }

  async getOrdersByUser(id: number) {
    const user = this.findOne(id);

    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }
}

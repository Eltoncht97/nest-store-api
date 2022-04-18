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
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';
import { UsersService } from '../services/users.service';
import { MongoIdPipe } from '../../common/mongo-id.pipe';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', MongoIdPipe) id: string) {
    return await this.usersService.findOne(id);
  }

  @Get(':id/orders')
  getOrders(@Param('id', MongoIdPipe) id: string) {
    return this.usersService.getOrdersByUser(id);
  }

  @Post()
  async create(@Body() payload: CreateUserDto) {
    const newUser = await this.usersService.create(payload);
    return {
      user: newUser,
    };
  }

  @Put(':id')
  async update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateUserDto,
  ) {
    return {
      id,
      user: await this.usersService.update(id, payload),
    };
  }

  @Delete(':id')
  async remove(@Param('id', MongoIdPipe) id: string) {
    await this.usersService.remove(id);
    return {
      id,
    };
  }
}

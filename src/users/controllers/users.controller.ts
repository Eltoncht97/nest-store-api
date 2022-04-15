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

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Get(':id/orders')
  getOrders(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getOrdersByUser(id);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    const newUser = this.usersService.create(payload);
    return {
      user: newUser,
    };
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return {
      id,
      user: this.usersService.update(id, payload),
    };
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    this.usersService.remove(id);
    return {
      id,
    };
  }
}

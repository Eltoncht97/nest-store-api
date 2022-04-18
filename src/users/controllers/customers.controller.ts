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
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dtos';
import { CustomersService } from '../services/customers.service';
import { MongoIdPipe } from '../../common/mongo-id.pipe';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  async findAll() {
    return await this.customersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', MongoIdPipe) id: string) {
    return await this.customersService.findOne(id);
  }

  @Post()
  async create(@Body() payload: CreateCustomerDto) {
    const newCustomer = await this.customersService.create(payload);
    return {
      customer: newCustomer,
    };
  }

  @Put(':id')
  async update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateCustomerDto,
  ) {
    return {
      id,
      customer: await this.customersService.update(id, payload),
    };
  }

  @Delete(':id')
  async remove(@Param('id', MongoIdPipe) id: string) {
    await this.customersService.remove(id);
    return {
      id,
    };
  }
}

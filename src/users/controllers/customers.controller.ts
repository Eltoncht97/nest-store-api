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

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCustomerDto) {
    const newCustomer = this.customersService.create(payload);
    return {
      customer: newCustomer,
    };
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCustomerDto,
  ) {
    return {
      id,
      customer: this.customersService.update(id, payload),
    };
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    this.customersService.remove(id);
    return {
      id,
    };
  }
}

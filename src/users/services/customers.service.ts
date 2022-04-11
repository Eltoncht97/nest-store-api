import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dtos';

@Injectable()
export class CustomersService {
  private counterId = 1;
  private customers: Customer[] = [
    {
      id: 1,
      name: 'Customer 1',
      lastName: 'Chavez 1',
      phone: '1234567',
    },
  ];

  findAll() {
    return this.customers;
  }

  findOne(id: number) {
    return this.customers.find((item) => item.id === id);
  }

  create(payload: CreateCustomerDto) {
    this.counterId = this.counterId + 1;
    const newCustomer = {
      id: this.counterId,
      ...payload,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  update(id: number, payload: UpdateCustomerDto) {
    const customer = this.findOne(id);

    if (!customer) {
      return new NotFoundException(`Customer #${id} not found`);
    }
    const index = this.customers.findIndex((item) => item.id === id);
    this.customers[index] = {
      ...customer,
      ...payload,
    };
    return this.customers[index];
  }

  remove(id: number) {
    const customer = this.findOne(id);

    if (!customer) {
      return new NotFoundException(`Customer #${id} not found`);
    }
    this.customers.filter((item) => item.id !== id);
    return customer;
  }
}

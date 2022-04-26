import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers.controller';
import { OrdersController } from './controllers/orders.controller';
import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers.service';
import { User, userSchema } from './entities/user.entity';
import { Customer, customerSchema } from './entities/customer.entity';
import { Order, orderSchema } from './entities/order.entity';
import { ProductsModule } from '../products/products.module';
import { OrdersService } from './services/orders.service';
import { ProfileController } from './controllers/profile.controller';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema,
      },
      {
        name: Customer.name,
        schema: customerSchema,
      },
      {
        name: Order.name,
        schema: orderSchema,
      },
    ]),
  ],
  controllers: [UsersController, CustomersController, OrdersController, ProfileController],
  providers: [UsersService, CustomersService, OrdersService],
  exports: [UsersService],
})
export class UsersModule {}

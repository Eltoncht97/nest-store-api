import { IsNotEmpty, IsMongoId, IsDate, IsArray } from 'class-validator';
import { PartialType, ApiProperty, OmitType } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  readonly customer: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  readonly date: Date;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  readonly products: string[];
}

export class UpdateOrderDto extends PartialType(
  OmitType(CreateOrderDto, ['products']),
) {}

export class AddProductsToOrderDto {
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  readonly productsIds: string[];
}

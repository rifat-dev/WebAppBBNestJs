import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsCurrency, IsDateString, IsInt } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty()
  accommodation: Prisma.AccommodationCreateNestedOneWithoutHistoryInput;
  @ApiProperty()
  host: Prisma.HostCreateNestedOneWithoutBookingInput;
  @ApiProperty()
  tenant: Prisma.TenantCreateNestedOneWithoutBookedInput;
  @ApiProperty()
  tenant_comment?: string | null;
  @ApiProperty()
  @IsInt()
  nights: number;
  @ApiProperty()
  // @IsCurrency()
  total_cost: number;
  @ApiProperty({
    description: 'format: year-month-day',
    example: '2022-07-10',
  })
  @IsDateString()
  date_start: string;
  @ApiProperty({
    description: 'format: year-month-day',
    example: '2022-07-12',
  })
  @IsDateString()
  date_end: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsBoolean, IsDateString, IsInt } from "class-validator";

export class UpdateBookingDto {
  @ApiProperty()
  accommodation?: Prisma.AccommodationUpdateOneRequiredWithoutHistoryInput;
  @ApiProperty()
  host?: Prisma.HostUpdateOneRequiredWithoutBookingInput;
  @ApiProperty()
  tenant?: Prisma.TenantUpdateOneRequiredWithoutBookedInput;
  @ApiProperty()
  tenant_comment?: string | null;
  @ApiProperty()
  @IsInt()
  nights?: number;
  @ApiProperty()
  total_cost?: number;
  @ApiProperty()
  @IsBoolean()
  status?: boolean;
  @ApiProperty({
    description: 'format: year-month-day',
    example: '2022-07-10',
  })
  @IsDateString()
  date_start?: string;
  @ApiProperty({
    description: 'format: year-month-day',
    example: '2022-07-12',
  })
  @IsDateString()
  date_end?: string;
}

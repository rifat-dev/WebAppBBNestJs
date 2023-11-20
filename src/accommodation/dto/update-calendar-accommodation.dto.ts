import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt } from 'class-validator';

export class UpdateCalendarAccommodationDto {
  @IsInt()
  tenant_id: number;
  @ApiProperty({
    description: 'format: year-month-day',
    example: '2022-07-10',
  })
  @IsDateString()
  date_start: string;
  @ApiProperty({
    description: 'format: year-month-day',
    example: '2022-07-15',
  })
  @IsDateString()
  date_end: string;
}

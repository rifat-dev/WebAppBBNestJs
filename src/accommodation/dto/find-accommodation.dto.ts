import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsInt,
  Min,
} from 'class-validator';

export class FindAccommodationDto {
  @ApiProperty({
    description: 'Enter city name',
    example: 'Moscow',
  })
  @IsString()
  @IsNotEmpty()
  city: string;
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
  @ApiProperty({
    description: 'Guests count',
    example: '2',
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  max_guests: number;
  @ApiProperty({
    description: 'Children count',
    example: '3',
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  max_child: number;
}

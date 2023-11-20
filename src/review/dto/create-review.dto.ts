import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateReviewDto {
  author: Prisma.TenantCreateNestedOneWithoutReviewsInput;
  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  title: string;
  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  content: string;
  @ApiProperty({
    description: 'Enter id of images',
    example: '["143", "804", "490"]',
    type: [String],
  })
  @IsArray()
  images: string[];
  @IsNumber()
  rating: number;
  accommodation: Prisma.AccommodationCreateNestedOneWithoutReviewsInput;
}

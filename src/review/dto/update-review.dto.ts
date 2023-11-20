import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateReviewDto {
  author?: Prisma.TenantUpdateOneRequiredWithoutReviewsInput;
  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  title?: string;
  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  content?: string;
  @ApiProperty({
    description: 'Enter id of images',
    example: '["143", "804", "490"]',
    type: [String],
  })
  @IsArray()
  images?: string[];
  @IsInt()
  rating?: number;
  accommodation?: Prisma.AccommodationUpdateOneRequiredWithoutReviewsInput;
}

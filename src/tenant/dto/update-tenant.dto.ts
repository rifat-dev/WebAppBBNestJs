import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Max,
  Min,
  MinLength,
  IsArray,
} from 'class-validator';

export class UpdateTenantDto {
  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  name?: string;
  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  surname?: string;
  @ApiProperty({})
  @IsString()
  @MinLength(7)
  password?: string;
  @ApiProperty({ example: '+7-987-909-98-17' })
  @IsPhoneNumber()
  phone_number?: string;
  @ApiProperty({ example: 'login@site.ru' })
  @IsEmail()
  email?: string;
  @ApiProperty({
    minimum: 1,
    maximum: 5,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;
  @ApiProperty({
    description: 'Enter id of images',
    example: '["143", "804", "490"]',
    type: [String],
  })
  @IsArray()
  profile_photo: string[];
  @ApiProperty({
    description: 'List of tenant reviews id',
    example: '[{ "connect: ["1", "2"]"}]',
    type: 'object',
  })
  reviews?: Prisma.ReviewUpdateManyWithoutAuthorInput;
  @ApiProperty({
    description: 'List of tenant booked id',
    example: '[{ "connect: ["1", "2"]"}]',
    type: 'object',
  })
  booked?: Prisma.BookingUpdateManyWithoutTenantInput;
}

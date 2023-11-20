import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsArray,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateHostDto {
  @ApiProperty()
  @IsString()
  @MinLength(7)
  password?: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name?: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  surname?: string;
  @ApiProperty()
  @IsPhoneNumber()
  phone_number?: string;
  @ApiProperty()
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
  profile_photo?: string[];
  Accommodation?: Prisma.AccommodationUpdateManyWithoutHostInput;
  Booking?: Prisma.BookingUpdateManyWithoutHostInput;
}

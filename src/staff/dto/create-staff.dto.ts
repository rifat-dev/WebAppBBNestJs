import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
  IsEnum,
  IsBoolean,
} from 'class-validator';

export enum Role {
  INTERNSHIP = 'INTERNSHIP',
  SUPPORT = 'SUPPORT',
  INSPECTOR = 'INSPECTOR',
  ADMIN = 'ADMIN',
}

export class CreateStaffDto {
  @ApiProperty({})
  @IsString()
  @MinLength(10)
  password: string;
  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  surname: string;
  @ApiProperty({ example: '+7-987-909-98-17' })
  @IsPhoneNumber()
  phone_number: string;
  @ApiProperty({ example: 'login@site.ru' })
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsBoolean()
  valid?: boolean;
  @ApiProperty({ enum: Role })
  @IsEnum(Role)
  role?: Role;
  history_actions: Prisma.JsonNullValueInput | Prisma.InputJsonValue;
  checked_accommodation?: Prisma.AccommodationCreateNestedManyWithoutStaffInput;
}

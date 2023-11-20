import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateHostDto {
  @ApiProperty({
    description: 'The host name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    description: 'The host surname',
  })
  @IsString()
  @IsNotEmpty()
  surname: string;
  @ApiProperty({
    description: 'The host password',
  })
  @IsString()
  @MinLength(7)
  password: string;
  @ApiProperty({
    description:
      'The host phone number. Enter like this example 7-987-009-08-07',
  })
  @IsPhoneNumber()
  phone_number: string;
  @ApiProperty({
    description: 'The host email. Enter like this example rifat@site.ru',
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    description: 'Need id image',
    type: [String],
  })
  @IsArray()
  profile_photo: string[];
}

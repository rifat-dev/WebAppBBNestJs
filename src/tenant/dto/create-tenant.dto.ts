import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  IsPhoneNumber,
} from 'class-validator';

export class CreateTenantDto {
  @ApiProperty({
    description: 'The tenant name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    description: 'The tenant surname',
  })
  @IsString()
  @IsNotEmpty()
  surname: string;
  @ApiProperty({
    description: 'The tenant password',
  })
  @IsString()
  @MinLength(7)
  password: string;
  @ApiProperty({
    description: 'The tenant phone number',
    example: '+7-987-009-08-07',
  })
  @IsPhoneNumber()
  phone_number: string;
  @ApiProperty({
    description: 'The tenant email.',
    example: 'login@site.ru',
  })
  @IsEmail()
  email: string;
}

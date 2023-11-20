import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateImageDto {
  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({})
  description?: string | null;
}

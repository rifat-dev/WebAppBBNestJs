import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";

export class UpdateAccommodationDto {
  host?: Prisma.HostUpdateOneRequiredWithoutAccommodationInput;
  @IsString()
  @IsNotEmpty()
  title?: string;
  @IsString()
  @IsNotEmpty()
  description?: string;
  @IsString()
  @IsNotEmpty()
  type_accommodation?: string;
  location?: Prisma.JsonNullValueInput | Prisma.InputJsonValue;
  @ApiProperty({
    description: 'Guests count',
    example: '2',
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  max_guests?: number;
  @ApiProperty({
    description: 'Children count',
    example: '3',
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  max_child?: number;
  @IsBoolean()
  approved?: boolean;
  staff?: Prisma.StaffUpdateOneRequiredWithoutChecked_accommodationInput;
  @IsArray()
  photo?: string[];
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;
  cost_night?: number;
  reviews?: Prisma.ReviewUpdateManyWithoutAccommodationInput;
  @IsBoolean()
  available?: boolean;
  history?: Prisma.BookingUpdateManyWithoutAccommodationInput;
  calendar_rental?: Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue;
}

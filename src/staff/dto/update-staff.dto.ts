import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Role } from './create-staff.dto';

export class UpdateStaffDto {
  password?: string;
  name?: string;
  surname?: string;
  phone_number?: string;
  email?: string;
  valid?: boolean;
  role?: Role;
  history_actions?: Prisma.JsonNullValueInput | Prisma.InputJsonValue;
  checked_accommodation?: Prisma.AccommodationUpdateManyWithoutStaffInput;
}

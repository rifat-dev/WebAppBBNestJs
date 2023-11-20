import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Accommodation } from '@prisma/client';

@Injectable()
export class AccommodationService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.AccommodationCreateInput): Promise<Accommodation> {
    return this.prisma.accommodation.create({
      data,
    });
  }

  async findAll(
    params: Prisma.AccommodationFindManyArgs,
  ): Promise<Accommodation[]> {
    return this.prisma.accommodation.findMany(params);
  }

  async findOne(
    accommodationWhereUniqueInput: Prisma.AccommodationWhereUniqueInput,
  ): Promise<Accommodation | null> {
    return this.prisma.accommodation.findUnique({
      where: accommodationWhereUniqueInput,
    });
  }

  async update(
    where: Prisma.AccommodationWhereUniqueInput,
    data: Prisma.AccommodationUpdateInput,
  ): Promise<Accommodation> {
    return this.prisma.accommodation.update({
      data,
      where,
    });
  }

  async remove(
    where: Prisma.AccommodationWhereUniqueInput,
  ): Promise<Accommodation> {
    return this.prisma.accommodation.delete({ where });
  }

  checkDateInCalendar(
    calendar: Prisma.JsonArray,
    param_start: Date,
    param_end: Date,
  ): boolean {
    let ans = true;
    calendar.forEach((item) => {
      if (item && typeof item === 'object' && !Array.isArray(item)) {
        const curObj = item as Prisma.JsonObject;
        const startDate = new Date(String(curObj['start']));
        const endDate = new Date(String(curObj['end']));
        if (startDate < param_end && param_start < endDate) {
          ans = false;
          return false;
        }
      } else {
        console.log('checkDateInCalendar() else block: RETURNED FALSE!');
        ans = false;
        return false;
      }
    });
    return ans;
  }
}

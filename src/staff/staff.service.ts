import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Staff, Prisma } from '@prisma/client';

@Injectable()
export class StaffService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.StaffCreateInput): Promise<Staff> {
    return this.prisma.staff.create({
      data,
    });
  }

  async findAll(params: Prisma.StaffFindManyArgs): Promise<Staff[]> {
    return this.prisma.staff.findMany(params);
  }

  async findOne(
    staffWhereUniqueInput: Prisma.StaffWhereUniqueInput,
  ): Promise<Staff | null> {
    return this.prisma.staff.findUnique({
      where: staffWhereUniqueInput,
    });
  }

  async update(
    where: Prisma.StaffWhereUniqueInput,
    data: Prisma.StaffUpdateInput,
  ): Promise<Staff> {
    return this.prisma.staff.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.StaffWhereUniqueInput): Promise<Staff> {
    return this.prisma.staff.delete({ where });
  }
}

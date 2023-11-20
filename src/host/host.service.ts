import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Host, Prisma } from '@prisma/client';

@Injectable()
export class HostService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.HostCreateInput): Promise<Host> {
    return this.prisma.host.create({
      data,
    });
  }

  async findAll(params: Prisma.HostFindManyArgs): Promise<Host[]> {
    return this.prisma.host.findMany(params);
  }

  async findOne(
    hostWhereUniqueInput: Prisma.HostWhereUniqueInput,
  ): Promise<Host | null> {
    return this.prisma.host.findUnique({
      where: hostWhereUniqueInput,
    });
  }

  async update(
    where: Prisma.HostWhereUniqueInput,
    data: Prisma.HostUpdateInput,
  ): Promise<Host> {
    return this.prisma.host.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.HostWhereUniqueInput): Promise<Host> {
    return this.prisma.host.delete({ where });
  }
}

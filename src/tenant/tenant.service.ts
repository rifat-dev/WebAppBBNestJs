import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Tenant, Prisma } from '@prisma/client';
import { CreateTenantDto } from './dto/create-tenant.dto';

@Injectable()
export class TenantService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTenantDto): Promise<Tenant> {
    return this.prisma.tenant.create({
      data,
    });
  }

  async findAll(params: Prisma.TenantFindManyArgs): Promise<Tenant[]> {
    return this.prisma.tenant.findMany(params);
  }

  async findOne(
    tenantWhereUniqueInput: Prisma.TenantWhereUniqueInput,
  ): Promise<Tenant | null> {
    return this.prisma.tenant.findUnique({
      where: tenantWhereUniqueInput,
    });
  }

  async update(
    where: Prisma.TenantWhereUniqueInput,
    data: Prisma.TenantUpdateInput,
  ): Promise<Tenant> {
    return this.prisma.tenant.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.TenantWhereUniqueInput): Promise<Tenant> {
    return this.prisma.tenant.delete({ where });
  }
}

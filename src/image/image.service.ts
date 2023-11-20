import { Injectable, NotFoundException } from '@nestjs/common';
import { Image, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ImageService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ImageCreateInput): Promise<Image> {
    return this.prisma.image.create({ data });
  }

  async findOne(
    imageWhereUniqueInput: Prisma.ImageWhereUniqueInput,
  ): Promise<Image | null> {
    return this.prisma.image.findUnique({
      where: imageWhereUniqueInput,
    });
  }

  async update(
    where: Prisma.ImageWhereUniqueInput,
    data: Prisma.ImageUpdateInput,
  ): Promise<Image> {
    const imageData = await this.findOne(where);
    if (!imageData) {
      throw new NotFoundException();
    }
    return this.prisma.image.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.ImageWhereUniqueInput) {
    const imageData = await this.findOne(where);
    if (!imageData) {
      throw new NotFoundException();
    }
    return this.prisma.image.delete({ where: where });
  }
}

import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from '../prisma.service';
import { Review, Prisma } from '@prisma/client';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ReviewCreateInput): Promise<Review> {
    return this.prisma.review.create({
      data,
    });
  }

  async findAll(params: Prisma.ReviewFindManyArgs): Promise<Review[]> {
    return this.prisma.review.findMany(params);
  }

  async findOne(
    reviewWhereUniqueInput: Prisma.ReviewWhereUniqueInput,
  ): Promise<Review | null> {
    return this.prisma.review.findUnique({
      where: reviewWhereUniqueInput,
    });
  }

  async update(
    where: Prisma.ReviewWhereUniqueInput,
    data: Prisma.ReviewUpdateInput,
  ): Promise<Review> {
    return this.prisma.review.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.ReviewWhereUniqueInput): Promise<Review> {
    return this.prisma.review.delete({ where });
  }
}

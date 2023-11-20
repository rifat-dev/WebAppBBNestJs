import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Prisma, Booking } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.BookingCreateInput): Promise<Booking> {
    return this.prisma.booking.create({
      data,
    });
  }

  async findAll(params: Prisma.BookingFindManyArgs): Promise<Booking[]> {
    return this.prisma.booking.findMany(params);
  }

  async findOne(
    bookingWhereUniqueInput: Prisma.BookingWhereUniqueInput,
  ): Promise<Booking | null> {
    return this.prisma.booking.findUnique({
      where: bookingWhereUniqueInput,
    });
  }

  async update(
    where: Prisma.BookingWhereUniqueInput,
    data: Prisma.BookingUpdateInput,
  ): Promise<Booking> {
    return this.prisma.booking.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.BookingWhereUniqueInput): Promise<Booking> {
    return this.prisma.booking.delete({ where });
  }
}

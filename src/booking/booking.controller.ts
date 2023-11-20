import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { Prisma, Booking as BookingModel } from '@prisma/client';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ApiHeader, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async create(@Body() bookingData: CreateBookingDto): Promise<BookingModel> {
    return this.bookingService.create(bookingData);
  }

  @Get('request/:id')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 204, description: 'No Content' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be host id',
    type: Number,
  })
  findTopAll(@Param('id', ParseIntPipe) id: number): Promise<BookingModel[]> {
    return this.bookingService.findAll({
      where: {
        host_id: id,
        status: false,
      },
      orderBy: {
        date_start: 'desc',
      },
    });
  }

  @Get('id/:id')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 204, description: 'No Content' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be booking id',
    type: Number,
  })
  findOneId(@Param('id', ParseIntPipe) id: number): Promise<BookingModel> {
    return this.bookingService.findOne({ id: id });
  }

  @Patch('id/:id')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  update(
    @Param('id') id: string,
    @Body() bookingUpdateInput: UpdateBookingDto,
  ): Promise<BookingModel> {
    return this.bookingService.update({ id: Number(id) }, bookingUpdateInput);
  }

  @Delete('id/:id')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  remove(@Param('id') id: string) {
    return this.bookingService.remove({ id: Number(id) });
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  ParseIntPipe,
} from '@nestjs/common';
import { AccommodationService } from './accommodation.service';
import { Prisma, Accommodation as AccommodationModel } from '@prisma/client';
import { UpdateCalendarAccommodationDto } from './dto/update-calendar-accommodation.dto';
import { FindAccommodationDto } from './dto/find-accommodation.dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAccommodationDto } from './dto/create-accommodation.dto';
import { UpdateAccommodationDto } from './dto/update-accommodation.dto';

@ApiTags('accommodation')
@Controller('accommodation')
export class AccommodationController {
  constructor(private readonly accommodationService: AccommodationService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async create(
    @Body() accommodationData: CreateAccommodationDto,
  ): Promise<AccommodationModel> {
    return this.accommodationService.create(accommodationData);
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
    description: 'Should be accommodation id',
    type: Number,
  })
  findOneId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AccommodationModel> {
    return this.accommodationService.findOne({ id: id });
  }

  @Post('available')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 204, description: 'No Content' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findAvailable(@Body() findAccommodationDto: FindAccommodationDto) {
    console.log('Got');
    console.log(findAccommodationDto);
    const city_param = findAccommodationDto.city;
    const param_start = new Date(String(findAccommodationDto.date_start));
    const param_end = new Date(String(findAccommodationDto.date_end));
    const availableAccom_json: AccommodationModel[] = [];
    const accom_av_list = await this.accommodationService.findAll({
      where: {
        approved: true,
        max_guests: {
          gte: findAccommodationDto.max_guests,
        },
        max_child: {
          gte: findAccommodationDto.max_child,
        },
        location: {
          path: ['city'],
          equals: city_param,
        },
      },
      orderBy: {
        rating: 'desc',
      },
    });
    if (
      accom_av_list &&
      typeof accom_av_list === 'object' &&
      Array.isArray(accom_av_list)
    ) {
      accom_av_list.forEach((cur_accom) => {
        if (
          cur_accom.calendar_rental &&
          typeof cur_accom.calendar_rental === 'object' &&
          Array.isArray(cur_accom.calendar_rental)
        ) {
          const calendar = cur_accom.calendar_rental as Prisma.JsonArray;
          const result_ofCheck = this.accommodationService.checkDateInCalendar(
            calendar,
            param_start,
            param_end,
          );
          if (result_ofCheck) {
            availableAccom_json.push(cur_accom);
          }
        }
      });
    }
    console.log(availableAccom_json);
    return availableAccom_json;
  }

  @Patch('id/:id')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  update(
    @Param('id') id: string,
    @Body() accommodationUpdateInput: UpdateAccommodationDto,
  ): Promise<AccommodationModel> {
    // accommodationUpdateInput.location as Interface
    return this.accommodationService.update(
      { id: Number(id) },
      accommodationUpdateInput,
    );
  }

  @Patch('add-dates/:id')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async addBooking(
    @Param('id') id: string,
    @Body() updateCalendarAccommodationDto: UpdateCalendarAccommodationDto,
  ) {
    const accom = await this.accommodationService.findOne({ id: Number(id) });
    const param_start = new Date(
      String(updateCalendarAccommodationDto.date_start),
    );
    const param_end = new Date(String(updateCalendarAccommodationDto.date_end));
    const tenant_id = updateCalendarAccommodationDto.tenant_id;
    if (
      accom.calendar_rental &&
      typeof accom.calendar_rental === 'object' &&
      Array.isArray(accom.calendar_rental)
    ) {
      const calendar = accom.calendar_rental as Prisma.JsonArray;
      const result_ofCheck = this.accommodationService.checkDateInCalendar(
        calendar,
        param_start,
        param_end,
      );
      if (result_ofCheck) {
        calendar.push({
          tenant_id: tenant_id,
          start: String(param_start),
          end: String(param_end),
        });
        const addedNewDate = await this.accommodationService.update(
          { id: Number(id) },
          {
            calendar_rental: calendar,
          },
        );
        const newCalendar = calendar.sort(function (
          a: Prisma.JsonValue,
          b: Prisma.JsonValue,
        ) {
          const ad = new Date(a['start']);
          const bd = new Date(b['start']);
          if (ad < bd) {
            return -1;
          } else if (ad == bd) {
            return 0;
          } else {
            return 1;
          }
        });
        return this.accommodationService.update(
          { id: Number(id) },
          { calendar_rental: newCalendar },
        );
      } else {
        throw new ConflictException();
      }
    } else {
      console.log('NOT_ARRAY_______________');
      return accom.calendar_rental;
    }
  }

  @Delete('id/:id')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  remove(@Param('id') id: string) {
    return this.accommodationService.remove({ id: Number(id) });
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, ParseIntPipe
} from "@nestjs/common";
import { StaffService } from './staff.service';
import { Staff as StaffModel, Prisma } from '@prisma/client';
import { ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateStaffDto, Role } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@ApiTags('staff')
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async create(@Body() staffData: CreateStaffDto): Promise<StaffModel> {
    return this.staffService.create(staffData);
  }

  @Get('INSPECTOR/:email')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 204, description: 'No Content' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({
    name: 'email',
    required: true,
    description: 'Should be ONLY INSPECTOR email',
    type: String,
  })
  findTopAll(
    @Param('email') email: string,
    @Body() pagination: { skip: number; take: number },
  ): Promise<StaffModel[]> {
    return this.staffService.findAll({
      where: {
        role: 'INSPECTOR',
        email: email,
      },
      orderBy: {
        id: 'desc',
      },
      select: {
        email: true,
        name: true,
        surname: true,
        phone_number: true,
      },
      skip: pagination.skip,
      take: pagination.take,
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
    description: 'Should be id number',
    type: Number,
  })
  findOneId(@Param('id', ParseIntPipe) id: number): Promise<StaffModel> {
    return this.staffService.findOne({ id: id });
  }

  @Patch('id/:id')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  update(
    @Param('id') id: string,
    @Body() staffUpdateInput: UpdateStaffDto,
  ): Promise<StaffModel> {
    return this.staffService.update({ id: Number(id) }, staffUpdateInput);
  }

  @Delete('id/:id')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  remove(@Param('id') id: string) {
    return this.staffService.remove({ id: Number(id) });
  }
}

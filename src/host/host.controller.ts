import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, ParseIntPipe
} from "@nestjs/common";
import { HostService } from './host.service';
import { Host as HostModel, Prisma } from '@prisma/client';
import { ApiHeader, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { CreateHostDto } from './dto/create-host.dto';
import { UpdateHostDto } from './dto/update-host.dto';

@ApiTags('host')
@Controller('host')
export class HostController {
  constructor(private readonly hostService: HostService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async create(@Body() createHostDto: CreateHostDto): Promise<HostModel> {
    return this.hostService.create(createHostDto);
  }

  @Get('top/:n')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 204, description: 'No Content' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({
    name: 'n',
    required: true,
    description: 'Should be rating number',
    type: Number,
  })
  findTopAll(
    @Param('n', ParseIntPipe) n: number,
    @Body() pagination: { skip: number; take: number },
  ): Promise<HostModel[]> {
    return this.hostService.findAll({
      where: {
        rating: {
          gte: n,
        },
      },
      orderBy: {
        rating: 'desc',
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
    description: 'Should be host id',
    type: Number,
  })
  findOneId(@Param('id', ParseIntPipe) id: number): Promise<HostModel> {
    return this.hostService.findOne({ id: id });
  }

  @Patch('id/:id')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  update(
    @Param('id') id: string,
    @Body() hostUpdateInput: UpdateHostDto,
  ): Promise<HostModel> {
    return this.hostService.update({ id: Number(id) }, hostUpdateInput);
  }

  @Delete('id/:id')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  remove(@Param('id') id: string) {
    return this.hostService.remove({ id: Number(id) });
  }
}

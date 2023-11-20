import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UsePipes,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { Tenant as TenantModel } from '@prisma/client';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('tenant')
@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async create(@Body() tenantData: CreateTenantDto): Promise<TenantModel> {
    return this.tenantService.create(tenantData);
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
  ): Promise<TenantModel[]> {
    return this.tenantService.findAll({
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
    description: 'Should be id number',
    type: Number,
  })
  findOneId(@Param('id', ParseIntPipe) id: number): Promise<TenantModel> {
    return this.tenantService.findOne({ id: id });
  }

  @Get('email/:email')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 204, description: 'No Content' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({
    name: 'email',
    required: true,
    description: 'Should be ONLY email',
    type: String,
  })
  findOneEmail(@Param('email') email: string): Promise<TenantModel> {
    return this.tenantService.findOne({ email: String(email) });
  }

  @Patch('id/:id')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  update(
    @Param('id') id: string,
    @Body() updateTenantDto: UpdateTenantDto,
  ): Promise<TenantModel> {
    return this.tenantService.update({ id: Number(id) }, updateTenantDto);
  }

  @Delete('id/:id')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  remove(@Param('id') id: string) {
    return this.tenantService.remove({ id: Number(id) });
  }
}

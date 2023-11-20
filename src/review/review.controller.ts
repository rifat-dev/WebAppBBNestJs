import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, ParseIntPipe
} from "@nestjs/common";
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review as ReviewModel, Prisma } from '@prisma/client';
import { ApiHeader, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async create(@Body() reviewData: CreateReviewDto): Promise<ReviewModel> {
    return this.reviewService.create(reviewData);
  }

  @Get('home/:id')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 204, description: 'No Content' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be home id',
    type: Number,
  })
  findTopAll(
    @Param('id', ParseIntPipe) id: number,
    @Body() pagination: { skip: number; take: number },
  ): Promise<ReviewModel[]> {
    return this.reviewService.findAll({
      where: {
        accommodation_id: id,
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
    description: 'Should be review id',
    type: Number,
  })
  findOneId(@Param('id', ParseIntPipe) id: number): Promise<ReviewModel> {
    return this.reviewService.findOne({ id: id });
  }

  @Patch('id/:id')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  update(
    @Param('id') id: string,
    @Body() reviewUpdateInput: UpdateReviewDto,
  ): Promise<ReviewModel> {
    return this.reviewService.update({ id: Number(id) }, reviewUpdateInput);
  }

  @Delete('id/:id')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  remove(@Param('id') id: string) {
    return this.reviewService.remove({ id: Number(id) });
  }
}

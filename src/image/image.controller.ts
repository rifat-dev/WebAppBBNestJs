import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  StreamableFile,
  NotFoundException, ParseIntPipe
} from "@nestjs/common";
import { Readable } from 'stream';
import { Response } from 'express';
import { ImageService } from './image.service';
import { Image as ImageModel, Prisma } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateImageDto } from './dto/create-image.dto';
import { ApiConsumes, ApiHeader, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdateImageDto } from './dto/update-image.dto';

@ApiTags('image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() imageData: CreateImageDto,
  ): Promise<ImageModel> {
    return this.imageService.create({
      name: imageData.name,
      data: file.buffer,
      description: imageData.description,
    });
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 204, description: 'No Content' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be image id',
    type: Number,
  })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) response: Response,
  ) {
    const imageData = await this.imageService.findOne({ id: id });
    if (!imageData) {
      throw new NotFoundException();
    }
    const stream = Readable.from(imageData.data);
    response.set({
      'Content-Disposition': `inline; filename="${imageData.name}"`,
      'Content-Type': 'image',
    });
    return new StreamableFile(stream);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async update(
    @Param('id') id: string,
    @Body() imageUpdateInput: UpdateImageDto,
  ) {
    return this.imageService.update({ id: Number(id) }, imageUpdateInput);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async remove(@Param('id') id: string) {
    return this.imageService.remove({ id: Number(id) });
  }
}

import { Module } from '@nestjs/common';
import { AccommodationService } from './accommodation.service';
import { AccommodationController } from './accommodation.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [AccommodationController],
  providers: [AccommodationService, PrismaService]
})
export class AccommodationModule {}

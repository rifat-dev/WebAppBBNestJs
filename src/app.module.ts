import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { TenantModule } from './tenant/tenant.module';
import { StaffModule } from './staff/staff.module';
import { ReviewModule } from './review/review.module';
import { AccommodationModule } from './accommodation/accommodation.module';
import { BookingModule } from './booking/booking.module';
import { HostModule } from './host/host.module';
import { ImageModule } from './image/image.module';
import { AuthModule } from './auth/auth.module';
import { AppGateway } from './app.gateway';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    TenantModule,
    StaffModule,
    ReviewModule,
    AccommodationModule,
    BookingModule,
    HostModule,
    ImageModule,
    AuthModule.forRoot({
      connectionURI: process.env.ConnectionURI,
      apiKey: process.env.APIKey,
      appInfo: {
        appName: 'BB',
        apiDomain: 'http://localhost:716',
        websiteDomain: 'http://localhost:116',
        apiBasePath: '/auth',
        websiteBasePath: '/auth',
      },
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 9,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    AppGateway,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}

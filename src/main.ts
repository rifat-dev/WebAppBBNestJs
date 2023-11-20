import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import supertokens from 'supertokens-node';
import { SupertokensExceptionFilter } from './auth/auth.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import { PrismaService } from './prisma.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NotFoundExceptionFilter } from './not-found-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.enableCors({
    origin: ['http://localhost:116'],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });
  app.useGlobalFilters(new SupertokensExceptionFilter());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', 'views/includes'));
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const config = new DocumentBuilder()
    .setTitle('Bed and Bathroom API')
    .setDescription(
      'Пользовательский интерфейс, который служит интерактивной документацией по API для проекта онлайн-площадки, которая объединяет людей, желающих сдать свое жилье, \n' +
        ' с теми, кто ищет жилье в определенных местах.',
    )
    .setVersion('1.6')
    .setTermsOfService(
      "Thank you for using the Bed and Bathroom API. By accessing or using my API, you agree to the following terms and conditions. 1) Content available through the API: The API contains some third-party content (e.g., text, images, videos). Such content is the sole responsibility of the person who provided it. Content available through my API may be subject to intellectual property rights, and if so, you may not use it unless you are licensed to do so by the owner of such content or otherwise permitted by law. 2) API Liability: I MAKE NO SPECIFIC PROMISES REGARDING THE API. FOR EXAMPLE, I MAKE NO PROMISES REGARDING THE CONTENT AVAILABLE THROUGH THE API, THE SPECIFIC FEATURES OF THE API, THEIR RELIABILITY, AVAILABILITY, OR ABILITY TO MEET YOUR NEEDS.'",
    )
    .setContact(
      'Rifat Murtazin',
      'https://t.me/rifat_my',
      'rifat_my@icloud.com',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new NotFoundExceptionFilter());

  await app.listen(process.env.PORT || 116);
}
bootstrap();

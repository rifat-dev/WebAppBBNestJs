import {
  Controller,
  Get,
  Render,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';

import { SessionContainer } from 'supertokens-node/recipe/session';
import { AuthGuard } from './auth/auth.guard';
import { Session } from './auth/session.decorator';

import { AppService } from './app.service';

@UseInterceptors(TransformInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('home.hbs')
  root() {
    return { title: 'Главная страница - Bed&Bathroom' };
  }

  // @UseGuards(AuthGuard)
  @Get('/host')
  @Render('intro-host.hbs')
  host(@Session() session: SessionContainer) {
    return { title: 'Сдайте жильё с помощью - Bed&Bathroom' };
  }

  @Get('/search')
  @Render('search-page.hbs')
  search() {
    return { title: 'Поиск - Bed&Bathroom' };
  }

  @Get('/help-chat')
  @Render('help.hbs')
  help_chat() {
    return { title: 'Вопрос, Ответ - Bed&Bathroom' };
  }
}

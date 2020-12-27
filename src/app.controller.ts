import {
  Controller,
  Get,
  UseGuards,
  Request,
  Logger,
  Post,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from './user/auth/jwt.auth-guard';
import { AuthService } from './user/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AppService } from './app.service';

@Controller('hello')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello() {
    Logger.log('getHello', 'AppController');

    return this.appService.getHello();
  }

  @Post('/')
  async postHello(@Body() input: any): Promise<any> {
    Logger.log('postHello', 'AppController');

    return {
      input: {
        ...input,
      },
    };
  }
}

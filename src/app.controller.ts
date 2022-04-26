import { Controller, Get, UseGuards, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiKeyGuard } from './auth/guards/api-key.guard';
import { Public } from './auth/decorators/public.decorator';
@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @SetMetadata('isPublic', true)
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Get('/hello')
  getHello1(): string {
    return this.appService.getHello();
  }

  @UseGuards(ApiKeyGuard)
  @Get('/tasks')
  getTasks() {
    return this.appService.getTasks();
  }
}

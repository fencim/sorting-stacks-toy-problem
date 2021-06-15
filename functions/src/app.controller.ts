import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller('about')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @ApiOperation({
    operationId: "about",
    summary: "About this REST API"
  })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

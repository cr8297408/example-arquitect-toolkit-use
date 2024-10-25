import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get('/status')
  findAll(): string {
    return 'OK!!';
  }
}

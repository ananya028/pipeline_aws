import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/_hc')
  public healthcheck() {
    return { message: 'api is working' };
  }
}

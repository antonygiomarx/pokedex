import { HttpCode } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';

import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  execute() {
    return this.seedService.execute();
  }
}

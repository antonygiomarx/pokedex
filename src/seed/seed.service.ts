import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {
  execute() {
    console.log('SeedService.execute()');
    return 'SeedService.executed';
  }
}

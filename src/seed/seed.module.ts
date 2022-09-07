import { Module } from '@nestjs/common';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokemonModule } from '../pokemon/pokemon.module';
import { AdaptersModule } from '../common/adapters/adapters.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [AdaptersModule, PokemonModule],
  exports: [SeedService],
})
export class SeedModule {}

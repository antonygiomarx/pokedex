import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';

import { SeedService } from './seed.service';
import { PokemonModule } from '../pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';

describe('SeedService', () => {
  let service: SeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeedService],
      imports: [
        HttpModule,
        PokemonModule,
        MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
      ],
    }).compile();

    service = module.get<SeedService>(SeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should seed the database', async () => {
    expect(await service.execute()).resolves;
  });
});

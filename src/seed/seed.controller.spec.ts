import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';

import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { PokemonModule } from '../pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';

describe('SeedController', () => {
  let controller: SeedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeedController],
      providers: [SeedService],
      imports: [
        HttpModule,
        PokemonModule,
        MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
      ],
    }).compile();

    controller = module.get<SeedController>(SeedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should seed the database', async () => {
    expect(await controller.execute()).resolves;
  });
});

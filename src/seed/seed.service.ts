import { Injectable } from '@nestjs/common';
import { PokeAPIResponse } from './interfaces/poke-api-response.interface';
import { PokemonService } from '../pokemon/pokemon.service';
import { HttpAdapterService } from '../common/adapters/http/http-adapter.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly http: HttpAdapterService,
    private readonly pokemonService: PokemonService,
  ) {}

  private url = 'https://pokeapi.co/api/v2/pokemon';

  async execute() {
    try {
      await this.pokemonService.removeAll();

      const { data } = await this.http.get<PokeAPIResponse>(
        `${this.url}?limit=100&offset=0`,
        {
          headers: {
            'Accept-Encoding': 'compress',
          },
        },
      );

      const pokemonList = data.results.map((pokemon) => ({
        name: pokemon.name,
        no: +pokemon.url.split('/')[6],
      }));

      await this.pokemonService.createMany(pokemonList);

      return 'Database seeded';
    } catch (error) {
      console.log('SeedService.execute -> error', error);
    }
  }
}

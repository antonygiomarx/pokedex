import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, take } from 'rxjs';
import { PokeAPIResponse } from './interfaces/poke-api-response.interface';
import { PokemonService } from '../pokemon/pokemon.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly http: HttpService,
    private readonly pokemonService: PokemonService,
  ) {}

  private url = 'https://pokeapi.co/api/v2/pokemon';

  async execute() {
    try {
      await this.pokemonService.removeAll();

      const request = this.http.get<PokeAPIResponse>(
        `${this.url}?limit=1000&offset=0`,
      );

      const pokemonList$ = request
        .pipe(
          map((response) => {
            return response.data.results;
          }),
        )
        .pipe(
          map((results) => {
            return results.map(({ name, url }) => {
              const no = +url.split('/')[6];
              return {
                name,
                no,
              };
            });
          }),
        );

      const pokemonList = await pokemonList$.toPromise();

      await this.pokemonService.createMany(pokemonList);

      return 'Database seeded';
    } catch (error) {
      console.log('SeedService.execute -> error', error);
    }
  }
}

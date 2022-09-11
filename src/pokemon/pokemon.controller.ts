import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  create(
    @Body({
      transform: (data: CreatePokemonDto) => ({
        ...data,
        name: data.name.trim().toLowerCase(),
      }),
    })
    createPokemonDto: CreatePokemonDto,
  ) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll(
    @Query()
    query: PaginationDto,
  ) {
    return this.pokemonService.findAll(query);
  }

  @Get(':id')
  findOne(
    @Param('id', {
      transform: (data: string) => {
        if (isNaN(+data)) return data.trim().toLowerCase();
        return +data;
      },
    })
    id: string,
  ) {
    return this.pokemonService.findOne(id);
  }

  @Patch(':term')
  update(
    @Param('term') term: string,
    @Body({
      transform: (data: UpdatePokemonDto) => ({
        ...data,
        name: data.name.trim().toLowerCase(),
      }),
    })
    updatePokemonDto: UpdatePokemonDto,
  ) {
    return this.pokemonService.update(term, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.pokemonService.remove(id);
  }
}

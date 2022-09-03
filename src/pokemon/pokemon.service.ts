import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);

      return pokemon;
    } catch (error) {
      new PokemonHandleExceptions(error).handle();
    }
  }

  async createMany(pokemonList: CreatePokemonDto[]) {
    try {
      const createdPokemonList = await this.pokemonModel.insertMany(
        pokemonList,
      );

      return createdPokemonList;
    } catch (error) {
      new PokemonHandleExceptions(error).handle();
    }
  }

  async findAll() {
    const pokemonList = await this.pokemonModel.find();

    if (!pokemonList) {
      throw new NotFoundException(`No pokemon found`);
    }

    return pokemonList;
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    console.log({ term });

    if (!isNaN(+term)) pokemon = await this.pokemonModel.findOne({ no: term });

    if (!pokemon && isValidObjectId(term))
      pokemon = await this.pokemonModel.findById(term);

    if (!pokemon)
      pokemon = await this.pokemonModel.findOne({
        name: term.trim().toLowerCase(),
      });

    if (!pokemon)
      throw new NotFoundException(`Pokemon with term "${term}" not found`);

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);

    try {
      await pokemon.updateOne(updatePokemonDto);

      return {
        ...pokemon.toJSON(),
        ...updatePokemonDto,
      };
    } catch (error) {
      new PokemonHandleExceptions(error).handle();
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon with ID "${id}" not found`);
    }

    return {
      message: `Pokemon with ID "${id}" successfully deleted`,
    };
  }

  async removeMany(ids: string[]) {
    const { deletedCount } = await this.pokemonModel.deleteMany({
      _id: { $in: ids },
    });

    if (deletedCount === 0) {
      throw new BadRequestException(`No pokemon found`);
    }

    return {
      message: `${deletedCount} pokemon successfully deleted`,
    };
  }

  async removeAll() {
    const { deletedCount } = await this.pokemonModel.deleteMany({});

    return {
      message: `${deletedCount} pokemon successfully deleted`,
    };
  }
}

class PokemonHandleExceptions {
  constructor(private error: any) {}

  handle() {
    console.log('PokemonHandleExceptions -> handle -> error', this.error);

    switch (this.error.code) {
      case 11000:
        throw new BadRequestException(
          `Pokemon with value ${JSON.stringify(
            this.error.keyValue,
          )} already exists`,
        );
      default:
        throw new BadRequestException(this.error.message);
    }
  }
}

import { Controller, Get } from '@nestjs/common';
import { GenresService } from './genres.service';
import { Genre } from './genre.types';

@Controller('genres')
export class GenresController {
    constructor(private readonly genresService: GenresService) { }

    @Get()
    getGenres(): Promise<Genre[]> {
        return this.genresService.getGenres();
    }
}
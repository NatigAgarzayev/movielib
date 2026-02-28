import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MovieListResponse } from './movie.types';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) { }

    @Get()
    getMovies(
        @Query('search') search?: string,
        @Query('page') page?: string,
    ): Promise<MovieListResponse> {
        const pageNumber = page ? parseInt(page, 10) : 1;

        if (search) {
            return this.moviesService.searchMovies(search, pageNumber);
        }

        return this.moviesService.getPopularMovies(pageNumber);
    }
}
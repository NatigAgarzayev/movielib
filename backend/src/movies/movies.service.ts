import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { transformMovie } from './movie.transformer';
import { MovieListResponse, TmdbMovie } from './movie.types';

@Injectable()
export class MoviesService {
    private readonly apiKey: string;
    private readonly baseUrl: string;

    constructor(private configService: ConfigService) {
        const apiKey = this.configService.get<string>('TMDB_API_KEY');
        const baseUrl = this.configService.get<string>('TMDB_BASE_URL');

        if (!apiKey || !baseUrl) {
            throw new Error('Missing required environment variables: TMDB_API_KEY or TMDB_BASE_URL');
        }

        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    async getPopularMovies(page = 1): Promise<MovieListResponse> {
        const { data } = await axios.get(`${this.baseUrl}/movie/popular`, {
            params: { api_key: this.apiKey, page },
        });

        return {
            results: data.results.map((m: TmdbMovie) => transformMovie(m)),
            totalResults: data.total_results,
            totalPages: data.total_pages,
            currentPage: data.page,
        };
    }

    async searchMovies(query: string, page = 1): Promise<MovieListResponse> {
        const { data } = await axios.get(`${this.baseUrl}/search/movie`, {
            params: { api_key: this.apiKey, query, page },
        });

        return {
            results: data.results.map((m: TmdbMovie) => transformMovie(m)),
            totalResults: data.total_results,
            totalPages: data.total_pages,
            currentPage: data.page,
        };
    }
}
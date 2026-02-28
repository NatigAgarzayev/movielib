import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Genre, TmdbGenre } from './genre.types';

@Injectable()
export class GenresService {
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

    async getGenres(): Promise<Genre[]> {
        const { data } = await axios.get(`${this.baseUrl}/genre/movie/list`, {
            params: { api_key: this.apiKey },
        });

        return data.genres.map((g: TmdbGenre) => ({
            id: g.id,
            label: g.name,
        }));
    }
}
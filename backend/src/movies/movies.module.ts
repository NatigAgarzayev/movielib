import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  providers: [MoviesService],
  controllers: [MoviesController]
})
export class MoviesModule {}

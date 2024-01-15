import {
  Controller,
  Get,
  HttpStatus,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { PostsService } from '../posts/posts.service';
import { ActionAverageRuntime } from './objects/action-average-runtime';
import { UserPostCount } from '../posts/objects/user-post-count';
import { ApiQuery } from '@nestjs/swagger';

const QUERY_LIMIT_DEFAULT = Number(process?.env?.QUERY_LIMIT_DEFAULT) || 10;

@Controller('statistics')
export class StatisticsController {
  constructor(
    private readonly statisticsService: StatisticsService,
    private readonly postsService: PostsService,
  ) {}

  @ApiQuery({ name: 'limit', required: false })
  @Get('/topcreators')
  getTopCreators(
    @Query(
      'limit',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
        optional: true,
      }),
    )
    limit: number,
  ): Promise<UserPostCount[]> {
    return this.postsService.getTopCreators(limit || QUERY_LIMIT_DEFAULT);
  }

  @Get('/runtimes')
  getActionsAverageRuntimes(): Promise<ActionAverageRuntime[]> {
    return this.statisticsService.getActionsAverageRuntimes();
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { PostsService } from '../posts/posts.service';
import { ActionAverageRuntime } from './dto/action-average-runtime';
import { UserPostCount } from 'src/posts/dto/user-post-count';

const QUERY_LIMIT_DEFAULT = Number(process?.env?.QUERY_LIMIT_DEFAULT) || 10;

@Controller('statistics')
export class StatisticsController {
  constructor(
    private readonly statisticsService: StatisticsService,
    private readonly postsService: PostsService,
  ) {}

  @Get('/topcreators')
  getTopCreators(@Query('limit') limit: number): Promise<UserPostCount[]> {
    return this.postsService.getTopCreators(
      Number(limit) || QUERY_LIMIT_DEFAULT,
    );
  }

  @Get('/runtimes')
  getActionsAverageRuntimes(): Promise<ActionAverageRuntime[]> {
    return this.statisticsService.getActionsAverageRuntimes();
  }
}

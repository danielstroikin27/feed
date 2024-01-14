import { Controller, Get, Query } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { PostsService } from '../posts/posts.service';

@Controller('statistics')
export class StatisticsController {
  static readonly QUERY_LIMIT_DEFAULT = 10;
  constructor(
    private readonly statisticsService: StatisticsService,
    private readonly postsService: PostsService,
  ) {}

  @Get('/topcreators')
  getTopCreators(@Query('limit') limit: number): Promise<string[]> {
    return this.postsService.getTopCreators(
      limit || process?.env.QUERY_LIMIT_DEFAULT
        ? parseInt(process?.env.QUERY_LIMIT_DEFAULT)
        : StatisticsController.QUERY_LIMIT_DEFAULT,
    );
  }

  @Get('/runtimes')
  getRuntimes() {
    return this.statisticsService.getAverageRuntime();
  }
}

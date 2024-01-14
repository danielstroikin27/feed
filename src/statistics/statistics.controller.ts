import { Controller, Get, Query } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { PostsService } from '../posts/posts.service';

@Controller('statistics')
export class StatisticsController {
  constructor(
    private readonly statisticsService: StatisticsService,
    private readonly postsService: PostsService,
  ) {}

  @Get('/topcreators')
  getTopCreators(@Query('limit') limit: number): Promise<string[]> {
    return this.postsService.getTopCreators(limit || 10);
  }

  @Get('/runtimes')
  getRuntimes() {
    return this.statisticsService.getAverageRuntime();
  }
}

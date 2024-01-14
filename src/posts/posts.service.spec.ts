import { Test } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { StatisticsModule } from '../statistics/statistics.module';
import { forwardRef } from '@nestjs/common';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PostsService],
      imports: [forwardRef(() => StatisticsModule)],
    }).compile();

    service = moduleRef.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

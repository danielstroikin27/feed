import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Date, Model } from 'mongoose';
import { Post, PostDocument } from './post';
import { CreatePostDto } from './dto/create-post-dto';
import { StatisticsService } from '../statistics/statistics.service';

@Injectable()
export class PostsService {
  @Inject(StatisticsService)
  private readonly statisticsService: StatisticsService;
  @InjectModel(Post.name) private postModel: Model<PostDocument>;

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const statisticsStart = Date.now();
    const createdPost = await this.postModel.create(createPostDto);

    await this.statisticsService.recordRuntime(
      'createPost',
      Date.now() - statisticsStart,
    );
    return createdPost;
  }

  async getPosts(
    start: number,
    limit: number,
    createdSince: string,
  ): Promise<Post[]> {
    const statisticsStart = Date.now();
    const sinceSomeDateQuery = createdSince
      ? { createdAt: { $gte: new Date(createdSince) } }
      : undefined;

    const result = this.postModel
      .find(sinceSomeDateQuery)
      .skip(start)
      .limit(limit)
      .exec();
    await this.statisticsService.recordRuntime(
      'getPosts',
      Date.now() - statisticsStart,
    );
    return result;
  }

  async getPostsNumber(): Promise<number> {
    return this.postModel.countDocuments().exec();
  }

  async getTopCreators(limit: number): Promise<any[]> {
    return this.postModel
      .aggregate([
        {
          $group: {
            _id: '$user',
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
        {
          $limit: limit,
        },
      ])
      .exec();
  }
}

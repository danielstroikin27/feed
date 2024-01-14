import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './post';
import { CreatePostDto } from './dto/create-post-dto';

@Injectable()
export class PostsService {
  @InjectModel(Post.name) private postModel: Model<PostDocument>;

  async create(createPostDto: CreatePostDto): Promise<Post> {
    return await this.postModel.create(createPostDto);
  }

  async getPosts(
    start: number,
    limit: number,
    createdSince: string,
  ): Promise<Post[]> {
    const sinceSomeDateQuery = createdSince
      ? { createdAt: { $gte: new Date(createdSince) } }
      : undefined;

    return await this.postModel
      .find(sinceSomeDateQuery)
      .skip(start)
      .limit(limit)
      .exec();
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

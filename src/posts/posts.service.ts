import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './post';
import { CreatePostDto } from './dto/create-post-dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  async getPosts(start: number, limit: number): Promise<Post[]> {
    return this.postModel.find().skip(start).limit(limit).exec();
  }

  async getPostsNumber(): Promise<number> {
    return this.postModel.countDocuments().exec();
  }
}

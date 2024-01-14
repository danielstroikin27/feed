import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post-dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  getPosts(
    @Query('start') start: number,
    @Query('limit') limit: number,
    @Query('created-since') createdSince: string,
  ) {
    return this.postsService.getPosts(start, limit, createdSince);
  }

  @Get('/number')
  getPostsNumber() {
    return this.postsService.getPostsNumber();
  }
}

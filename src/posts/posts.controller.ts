import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post-dto';
import { PostsService } from './posts.service';
import { RuntimMetricInterceptor } from 'src/interceptors/runtime-metric.interceptor';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseInterceptors(RuntimMetricInterceptor)
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @UseInterceptors(RuntimMetricInterceptor)
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

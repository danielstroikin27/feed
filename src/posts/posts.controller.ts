import {
  Body,
  Controller,
  Get,
  HttpStatus,
  ParseIntPipe,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePostDto } from './objects/dto/create-post-dto';
import { PostsService } from './posts.service';
import { RuntimMetricInterceptor as RuntimeMetricInterceptor } from '../interceptors/runtime-metric.interceptor';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseInterceptors(RuntimeMetricInterceptor)
  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @UseInterceptors(RuntimeMetricInterceptor)
  @UseInterceptors(CacheInterceptor)
  @Get()
  getPosts(
    @Query(
      'start',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
        optional: true,
      }),
    )
    start: number,
    @Query(
      'limit',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
        optional: true,
      }),
    )
    limit: number,
    @Query('created-since') createdSince: string,
  ) {
    return this.postsService.getPosts(start, limit, createdSince);
  }

  @Get('/number')
  getPostsNumber() {
    return this.postsService.getPostsNumber();
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { StatisticsService } from '../statistics/statistics.service';
import { PostsService } from './posts.service';
import { getModelToken } from '@nestjs/mongoose';
import { Post, PostDocument } from './post';
import { Model } from 'mongoose';

let controller: PostsController;
let service: PostsService;

beforeEach(async () => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    providers: [
      {
        provide: StatisticsService,
        useValue: {
          recordRuntime: jest.fn(),
        },
      },
      {
        provide: getModelToken(Post.name),
        useValue: { create: jest.fn((post) => post) },
      },
      PostsService,
    ],
    controllers: [PostsController],
  }).compile();

  controller = moduleRef.get<PostsController>(PostsController);
  service = moduleRef.get<PostsService>(PostsService);
});

it('should be defined', () => {
  expect(controller).toBeDefined();
});

describe('create post', () => {
  it('should create a post', async () => {
    const postDto = {
      title: 'Test Title',
      body: 'Test Body',
      user: 'Test User',
    };
    const createdPost = await controller.createPost(postDto);

    expect(createdPost).toHaveProperty('title', postDto.title);
    expect(createdPost).toHaveProperty('body', postDto.body);
    expect(createdPost).toHaveProperty('user', postDto.user);
  });
});

describe('get posts', () => {
  it('should get posts', async () => {
    jest.spyOn(controller['postsService'], 'getPosts').mockResolvedValueOnce([
      { title: 'Post 1', body: 'Body 1', user: 'User 1' },
      { title: 'Post 2', body: 'Body 2', user: 'User 2' },
    ]);

    const start = 0;
    const limit = 2;
    const posts = await controller.getPosts(start, limit, undefined);

    expect(posts).toHaveLength(2);
    expect(posts[0]).toHaveProperty('title', 'Post 1');
    expect(posts[1]).toHaveProperty('title', 'Post 2');
  });
});

describe('get posts with date created filter', () => {
  it('should get posts', async () => {
    jest.spyOn(controller['postsService'], 'getPosts').mockResolvedValueOnce([
      { title: 'Post 1', body: 'Body 1', user: 'User 1' },
      { title: 'Post 2', body: 'Body 2', user: 'User 2' },
    ]);

    const createdSince = '2024-01-13T14:52:55.000Z';
    const posts = await controller.getPosts(undefined, undefined, createdSince);

    expect(posts).toHaveLength(2);
    expect(posts[0]).toHaveProperty('title', 'Post 1');
    expect(posts[1]).toHaveProperty('title', 'Post 2');
  });
});

describe('get number of posts', () => {
  it('should get posts', async () => {
    jest
      .spyOn(controller['postsService'], 'getPostsNumber')
      .mockResolvedValueOnce(5);

    const posts = await controller.getPostsNumber();

    expect(posts).toBe(5);
  });
});

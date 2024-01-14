import { Test } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { Post, PostDocument } from './post';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

let service: PostsService;
let postModel: Model<PostDocument>;

beforeEach(async () => {
  const moduleRef = await Test.createTestingModule({
    providers: [
      {
        provide: getModelToken(Post.name),
        useValue: {
          create: jest.fn((post) => post),
          find: jest.fn(() => []),
        },
      },
      PostsService,
    ],
  }).compile();

  service = moduleRef.get<PostsService>(PostsService);
  postModel = moduleRef.get<Model<PostDocument>>(getModelToken(Post.name));
});

it('should be defined', () => {
  expect(service).toBeDefined();
});

describe('create', () => {
  it('should create a post', async () => {
    const postDto = {
      title: 'Test Title',
      body: 'Test Body',
      user: 'Test User',
    };

    const createdPost = await service.create(postDto);

    expect(createdPost).toHaveProperty('title', postDto.title);
    expect(createdPost).toHaveProperty('body', postDto.body);
    expect(createdPost).toHaveProperty('user', postDto.user);
  });
});

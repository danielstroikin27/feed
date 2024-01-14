import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';

describe('PostsController', () => {
  let controller: PostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // describe('create', () => {
  //   it('should create a post', async () => {
  //     const postDto = {
  //       title: 'Test Title',
  //       body: 'Test Body',
  //       user: 'Test User',
  //     };
  //     const createdPost = await controller.create(postDto);

  //     expect(createdPost).toHaveProperty('title', postDto.title);
  //     expect(createdPost).toHaveProperty('body', postDto.body);
  //     expect(createdPost).toHaveProperty('user', postDto.user);
  //   });
  // });

  // describe('getPosts', () => {
  //   it('should get posts', async () => {
  //     // Mock the getPosts method of the PostsService
  //     jest.spyOn(controller['postsService'], 'getPosts').mockResolvedValueOnce([
  //       { title: 'Post 1', body: 'Body 1', user: 'User 1' },
  //       { title: 'Post 2', body: 'Body 2', user: 'User 2' },
  //     ]);

  //     const start = 0;
  //     const limit = 2;
  //     const posts = await controller.getPosts(start, limit, undefined);

  //     expect(posts).toHaveLength(2);
  //     expect(posts[0]).toHaveProperty('title', 'Post 1');
  //     expect(posts[1]).toHaveProperty('title', 'Post 2');
  //   });
  // });

  // describe('getPosts', () => {
  //   it('should get posts', async () => {
  //     // Mock the getPosts method of the PostsService
  //     jest.spyOn(controller['postsService'], 'getPosts').mockResolvedValueOnce([
  //       { title: 'Post 1', body: 'Body 1', user: 'User 1' },
  //       { title: 'Post 2', body: 'Body 2', user: 'User 2' },
  //     ]);

  //     const createdSince = '2024-01-13T14:52:55.000Z';
  //     const posts = await controller.getPosts(
  //       undefined,
  //       undefined,
  //       createdSince,
  //     );

  //     expect(posts).toHaveLength(2);
  //     expect(posts[0]).toHaveProperty('title', 'Post 1');
  //     expect(posts[1]).toHaveProperty('title', 'Post 2');
  //   });
  // });
});

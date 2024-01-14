import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsController } from './statistics.controller';
import { ActionRuntime } from './statistics';
import { getModelToken } from '@nestjs/mongoose';
import { StatisticsService } from './statistics.service';
import { PostsService } from '../posts/posts.service';
import { Post, PostDocument } from '../posts/post';
import { Model } from 'mongoose';

let controller: StatisticsController;
let service: StatisticsService;
let postsService: PostsService;
let postModel: Model<PostDocument>;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      {
        provide: getModelToken(ActionRuntime.name),
        useValue: { create: jest.fn((statistics) => statistics) },
      },
      {
        provide: getModelToken(Post.name),
        useValue: {
          create: jest.fn((post) => post),
          aggregate: jest.fn(() => {
            exec: () => [
              {
                _id: 'user',
                count: 10,
              },
            ];
          }),
        },
      },
      PostsService,
      StatisticsService,
    ],
    controllers: [StatisticsController],
  }).compile();

  controller = module.get<StatisticsController>(StatisticsController);
  service = module.get<StatisticsService>(StatisticsService);
  postsService = module.get<PostsService>(PostsService);
  postModel = module.get<Model<PostDocument>>(getModelToken(Post.name));
});

it('should be defined', () => {
  expect(controller).toBeDefined();
});

describe('get users statistics', () => {
  it('should get top users with their number of posts', async () => {
    const spy = jest.spyOn(postModel, 'aggregate');
    await controller.getTopCreators(10);

    expect(spy).toHaveBeenCalled();
  });
});

describe('get actions statistics', () => {
  it('should get collection of aggregation metrics', async () => {
    jest
      .spyOn(controller['statisticsService'], 'getActionsAverageRuntimes')
      .mockResolvedValueOnce([{ _id: 'createPost', averageRuntime: 1 }]);

    const runtimes = await controller.getActionsAverageRuntimes();

    expect(runtimes).toBeInstanceOf(Array);
  });

  it('should get two aggregation metrics', async () => {
    jest
      .spyOn(controller['statisticsService'], 'getActionsAverageRuntimes')
      .mockResolvedValueOnce([
        { _id: 'createPost', averageRuntime: 1 },

        { _id: 'getPosts', averageRuntime: 10 },
      ]);

    const runtimes = await controller.getActionsAverageRuntimes();

    expect(runtimes).toHaveLength(2);
    expect(runtimes[0]).toHaveProperty('_id', 'createPost');
    expect(runtimes[1]).toHaveProperty('_id', 'getPosts');
  });
});

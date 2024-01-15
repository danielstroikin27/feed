import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsService } from './statistics.service';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { ActionRuntime, ActionRuntimeDocument, StatisticsSchema } from './objects/statistics';
import { PostsModule } from '../posts/posts.module';
import { forwardRef } from '@nestjs/common';
import { Model } from 'mongoose';

let service: StatisticsService;
let statisticsModel: Model<ActionRuntimeDocument>;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      StatisticsService,
      {
        provide: getModelToken(ActionRuntime.name),
        useValue: {
          create: jest.fn((statistics) => statistics),
        },
      },
    ],
  }).compile();

  service = module.get<StatisticsService>(StatisticsService);
  statisticsModel = module.get<Model<ActionRuntimeDocument>>(
    getModelToken(ActionRuntime.name),
  );
});

it('should be defined', () => {
  expect(service).toBeDefined();
});

it('should create a statistics', async () => {
  const statisticsDto = {
    action: 'Test Action',
    runtime: 10,
  };
  const spy = jest.spyOn(statisticsModel, 'create');
  const createdStatistics = await service.recordRuntime(
    statisticsDto.action,
    statisticsDto.runtime,
  );
  expect(spy).toHaveBeenCalled();
  expect(createdStatistics).toHaveProperty('action', statisticsDto.action);
  expect(createdStatistics).toHaveProperty('runtime', statisticsDto.runtime);
});

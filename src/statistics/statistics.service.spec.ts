import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsService } from './statistics.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Statistics, StatisticsSchema } from './statistics';
import { PostsModule } from '../posts/posts.module';
import { forwardRef } from '@nestjs/common';

// describe('StatisticsService', () => {
//   let service: StatisticsService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [
//         MongooseModule.forFeature([
//           { name: Statistics.name, schema: StatisticsSchema },
//         ]),
//         forwardRef(() => PostsModule),
//       ],
//       providers: [StatisticsService],
//     }).compile();

//     service = module.get<StatisticsService>(StatisticsService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });

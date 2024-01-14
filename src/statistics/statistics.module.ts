import { Module, forwardRef } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { Statistics, StatisticsSchema } from './statistics';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Statistics.name, schema: StatisticsSchema },
    ]),
    forwardRef(() => PostsModule),
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService],
  exports: [StatisticsService],
})
export class StatisticsModule {}

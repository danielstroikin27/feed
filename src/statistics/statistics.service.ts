// statistics/statistics.service.ts
import { Injectable } from '@nestjs/common';
import { Statistics, StatisticsDocument } from './statistics';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(Statistics.name)
    private statisticsModel: Model<StatisticsDocument>,
  ) {}

  async recordRuntime(action: string, runtime: number): Promise<void> {
    await this.statisticsModel.create({ action, runtime });
  }

  async getAverageRuntime(): Promise<any> {
    return this.statisticsModel
      .aggregate([
        {
          $group: {
            _id: '$action',
            averageRuntime: { $avg: '$runtime' },
          },
        },
      ])
      .exec();
  }
}

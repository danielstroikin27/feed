// statistics/statistics.service.ts
import { Injectable } from '@nestjs/common';
import { ActionRuntime, ActionRuntimeDocument } from './statistics';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActionAverageRuntime } from './dto/action-average-runtime';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(ActionRuntime.name)
    private statisticsModel: Model<ActionRuntimeDocument>,
  ) {}

  async recordRuntime(action: string, runtime: number): Promise<ActionRuntime> {
    return this.statisticsModel.create({ action, runtime });
  }

  async getActionsAverageRuntimes(): Promise<ActionAverageRuntime[]> {
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

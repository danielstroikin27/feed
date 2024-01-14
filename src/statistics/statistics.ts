import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StatisticsDocument = HydratedDocument<Statistics>;

@Schema({ collection: 'statistics', autoCreate: true })
export class Statistics {
  @Prop({ required: true })
  action: string;

  @Prop({ required: true })
  runtime: number;
}

export const StatisticsSchema = SchemaFactory.createForClass(Statistics);

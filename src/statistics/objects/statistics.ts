import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ActionRuntimeDocument = HydratedDocument<ActionRuntime>;

@Schema({ collection: 'statistics', autoCreate: true })
export class ActionRuntime {
  @Prop({ required: true })
  action: string;

  @Prop({ required: true })
  runtime: number;
}

export const StatisticsSchema = SchemaFactory.createForClass(ActionRuntime);

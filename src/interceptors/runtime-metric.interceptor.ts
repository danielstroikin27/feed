import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Statistics, StatisticsDocument } from '../statistics/statistics';

@Injectable()
export class RuntimMetricInterceptor implements NestInterceptor {
  constructor(
    @InjectModel(Statistics.name) private postModel: Model<StatisticsDocument>,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next.handle().pipe(tap(() => Date.now() - now));
  }
}

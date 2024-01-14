import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StatisticsService } from '../statistics/statistics.service';
import * as endpointsToIntercept from './intercepted-endpoints.json';

@Injectable()
export class RuntimMetricInterceptor implements NestInterceptor {
  @Inject(StatisticsService)
  private readonly statisticsService: StatisticsService;
  private readonly map: Map<string, string> = new Map();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const statisticsStart = Date.now();
    return next.handle().pipe(
      tap(() => {
        const statisticsEnd = Date.now();
        this.statisticsService.recordRuntime(
          this.getNameOfAction(context),
          statisticsEnd - statisticsStart,
        );
      }),
    );
  }

  private getNameOfAction(context: ExecutionContext) {
    const method = context.switchToHttp().getRequest().method;
    const url = context.switchToHttp().getRequest().originalUrl;
    const key = method + '-' + url.substring(1);

    if (this.map.has(key)) return this.map.get(key);

    const action = endpointsToIntercept.filter(
      (endpoint) => endpoint.path === url && endpoint.method === method,
    )[0].action;

    if (!action) this.map.set(key, key);
    else this.map.set(key, action);

    return action ? action : key;
  }
}

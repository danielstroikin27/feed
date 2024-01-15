import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
  // constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  // await this.cacheManager.set('test', 'test-value');
  // const testVal = await this.cacheManager.get('test');
}

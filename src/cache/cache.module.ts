import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { redisStore } from 'cache-manager-redis-yet';
import { RedisClientOptions } from 'redis';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      isGlobal: true,
      ttl: parseInt(process.env.REDIS_TTL) || 300000,
      max: parseInt(process.env.REDIS_MAX) || 100,
      socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6379,
      },
    }),
  ],
  providers: [CacheService],
})
export class AppCacheModule {}

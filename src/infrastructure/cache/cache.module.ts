import { Module } from '@nestjs/common';
import { RedisModule } from '../redis/redis.module';
import { USER_CACHE_PROVIDER } from './provider/user-cache.provider';
import { UserCacheService } from './redis/user-cache.service';

@Module({
  imports: [RedisModule],
  providers: [
    {
      provide: USER_CACHE_PROVIDER,
      useClass: UserCacheService,
    },
  ],
  exports: [USER_CACHE_PROVIDER],
})
export class CacheModule {}

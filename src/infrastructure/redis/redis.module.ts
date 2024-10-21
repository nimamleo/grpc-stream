import { Logger, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { REDIS_DB0_PROVIDER } from './provider/redis.provider';

@Module({
  providers: [
    {
      provide: REDIS_DB0_PROVIDER,
      useFactory: async () => {
        const client = new RedisService(0);
        await client.connect();
        logger.debug('redis database established on db index: 0');
        return client;
      },
    },
  ],
  exports: [REDIS_DB0_PROVIDER],
})
export class RedisModule {}

const logger = new Logger(RedisModule.name);

import { Injectable } from '@nestjs/common';
import { IRedisProvider } from './provider/redis.provider';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements IRedisProvider {
  private readonly redisClient: Redis;

  constructor(dbIndex: number) {
    this.redisClient = new Redis({
      host: 'localhost',
      port: 6379,
      db: dbIndex,
      lazyConnect: true,
      password: 'root',
    });
  }

  async connect(): Promise<void> {
    await this.redisClient.connect();
  }
  async disconnect(): Promise<void> {
    this.redisClient.disconnect();
  }
  getClient(): Redis {
    return this.redisClient;
  }
}

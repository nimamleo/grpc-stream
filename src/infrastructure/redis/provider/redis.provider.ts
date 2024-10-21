import Redis from 'ioredis';

export interface IRedisProvider {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getClient(): Redis;
}

export const REDIS_DB0_PROVIDER = 'redis-db0-provider';

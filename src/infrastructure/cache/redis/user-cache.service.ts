import { Inject, Injectable } from '@nestjs/common';
import { IUserCacheProvider } from '../provider/user-cache.provider';
import { IUser, IUserEntity } from '../../../model/user.model';
import {
  IRedisProvider,
  REDIS_DB0_PROVIDER,
} from '../../redis/provider/redis.provider';
import { using } from 'rxjs';

@Injectable()
export class UserCacheService implements IUserCacheProvider {
  constructor(
    @Inject(REDIS_DB0_PROVIDER) private readonly redis: IRedisProvider,
  ) {}

  async setUser(
    token: string,
    iUser: IUser,
    ttl?: number,
  ): Promise<IUserEntity> {
    if (!ttl) {
      ttl = 1 * 60; //second
    }
    await this.redis.getClient().set(token, JSON.stringify(iUser), 'EX', ttl);
    return {
      id: token,
      ...iUser,
    };
  }

  async getUser(token: string): Promise<IUserEntity> {
    const res = await this.redis.getClient().get(token);
    const user = JSON.parse(res);
    return { id: token, ...user };
  }

  async removeUser(token: string): Promise<boolean> {
    await this.redis.getClient().del(token);
    return true;
  }
}

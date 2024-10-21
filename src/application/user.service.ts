import { Inject, Injectable } from '@nestjs/common';
import { IUser, IUserEntity } from '../model/user.model';
import {
  IUserCacheProvider,
  USER_CACHE_PROVIDER,
} from '../infrastructure/cache/provider/user-cache.provider';
import { uuid } from 'uuidv4';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_CACHE_PROVIDER) private readonly userCache: IUserCacheProvider,
  ) {}
  async createUser(iUser: IUser): Promise<IUserEntity> {
    const token = uuid();
    const res = await this.userCache.setUser(token, iUser);
    return res;
  }

  async getUser(token: string): Promise<IUserEntity> {
    const res = await this.userCache.getUser(token);
    return res;
  }

  async removeUser(token: string): Promise<boolean> {
    await this.userCache.removeUser(token);
    return true;
  }
}

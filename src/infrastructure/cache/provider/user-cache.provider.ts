import { IUser, IUserEntity } from '../../../model/user.model';

export interface IUserCacheProvider {
  setUser(token: string, iUser: IUser, ttl?: number): Promise<IUserEntity>;
  getUser(token: string): Promise<IUserEntity>;
  removeUser(token: string): Promise<boolean>;
}

export const USER_CACHE_PROVIDER = 'user-cache-provider';

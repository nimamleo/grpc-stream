import { IEntity } from '../common/interface/entity.interface';

export interface IUser {
  name: string;
  email: string;
  pass: string;
}

export interface IUserEntity extends IUser, IEntity {}

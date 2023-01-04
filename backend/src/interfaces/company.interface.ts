import { ISeller, IUser } from './';

export interface ICompany extends ISeller {
  agents: IUser[];
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

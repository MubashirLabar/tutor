import { IUser } from './';

export interface ITip {
  _id?: string;
  amount: number;
  paid_by: IUser;
  paid_for: IUser;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

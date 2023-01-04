import { IUser } from './';

export interface IRefundRequest {
  _id?: string;
  amount: number;
  initiated_by: IUser;
  refund_from: IUser;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

import { IUser } from './';

export enum ReferralStatus {
  ACCEPTED = 'ACCEPTED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED'
}

export interface IReferrals {
  _id?: string;
  referred_by: IUser;
  referred_user: IUser;
  referall_link: string;
  status: ReferralStatus;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

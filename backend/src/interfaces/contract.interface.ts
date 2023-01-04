import { IUser, IDocument } from './';

export enum ContractStatus {
  COMPLETED = 'COMPLETED',
  IN_PROGRESS = 'IN_PROGRESS',
  DISPUTED = 'DISPUTED'
}

export enum PaymentOptions {
  HOURLY = 'HOURLY',
  FIXED = 'FIXED'
}

export interface IContract {
  _id?: string;
  deadline: Date;
  status: ContractStatus;
  documents?: IDocument[];
  payment_options: PaymentOptions;
  amount?: number;
  hourly_rate?: number;
  agent?: IUser;
  student?: IUser;
  tutors?: IUser[];
  job?: IUser;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

import { IUser } from './';

export enum QuickQuestionStatus {
  OPEN = 'OPEN',
  ANSWERED = 'ANSWERED',
  ASSIGNED = 'ASSIGNED'
}

export interface IQuickQuestion {
  _id?: string;
  title: string;
  description: string;
  answer: string;
  status: QuickQuestionStatus;
  posted_by: IUser;
  answered_by: IUser;
  assigned_to: IUser;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

import { IUser, IContract } from './';

export enum Visibility {
  DELETED = 'DELETED',
  HIDDEN = 'HIDDEN',
  VISIBLE = 'VISIBLE'
}

export type Ratings = 1 | 2 | 3 | 4 | 5;

export interface IReview {
  _id?: string;
  ratings: Ratings;
  review?: string;
  visibility: Visibility;
  contract: IContract;
  feedback_by: IUser;
  feedback_to?: IUser;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

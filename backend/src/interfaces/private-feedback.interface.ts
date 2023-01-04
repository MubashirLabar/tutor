import { IUser } from './';

type Ratings = 1 | 2 | 3 | 4 | 5;

export interface IPrivateFeedback {
  _id?: string;
  ratings: Ratings;
  review?: string;
  user: IUser;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

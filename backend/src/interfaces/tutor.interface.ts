import { IUser, ICommonUser, ISeller } from './';

export interface ITutor extends ICommonUser, ISeller {
  amount: number;
  user: IUser;
}

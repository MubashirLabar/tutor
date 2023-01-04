import { IUser, ICommonUser } from './';

export interface ICSUser extends ICommonUser {
  created_by_agent?: IUser;
  user: IUser;
}

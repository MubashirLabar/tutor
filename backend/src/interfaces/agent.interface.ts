import { ICommonUser, IUser, ISeller } from './';

export interface IAgent extends ICommonUser, ISeller {
  amount: number;
  company_name?: string;
  company_description?: string;
  company_logo?: string;
  referral_code?: string;
  user: IUser;
}

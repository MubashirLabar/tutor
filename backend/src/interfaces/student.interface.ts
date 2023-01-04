import { ICommonUser, IUser, ISubject, IAttachment, IPaymentMethods } from './';

export interface IStudent extends ICommonUser {
  amount: number;
  total_spent: number;
  total_hires: number;
  total_jobs_posted: number;
  interested_subjects: ISubject[];
  payment_method_verified: boolean;
  payment_method: IPaymentMethods;
  free_question_available: boolean;
  free_book_solutions_available: boolean;
  history_private: boolean;
  solutions?: string[];
  attachments?: IAttachment[];
  user?: IUser;
}

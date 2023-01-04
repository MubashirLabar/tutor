import { ICommonUser, ITutor, IStudent, IAgent, ICSUser } from './';

export interface IUser extends ICommonUser {
  referral_code?: string;
  agentProfile?: IAgent;
  csProfile?: ICSUser;
  tutorProfile?: ITutor;
  studentProfile?: IStudent;
}

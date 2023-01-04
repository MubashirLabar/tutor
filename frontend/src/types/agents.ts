import { IUpdateLocation, IUserInfo } from "./context/auth";
import { IPagination } from "./context/common";
import { IUser } from "./users";

export interface IAgent {
  languages: string[] | null;
  services: string[] | null;
  total_earned: number;
  total_jobs_completed: number;
  total_jobs_in_progress: number;
  created_at: Date;
  updated_at: Date;
  _id: string;
  first_name: string;
  last_name: string;
  company_name: string;
  company_description: string;
  company_logo: string;
  user: string;
  referral_code?: string;
  user_id: string;
  image_path?: string;
  cover_picture_path?: string;
  location?: IUpdateLocation;
  service?: { title: string; description: string };
}

export interface IAgentWithPagination {
  agents: IAgent[];
  pagination: IPagination;
}

export interface FetchAgentsSuccessResponse {
  status: string;
  message: string;
  data: IAgent[];
}

export interface FetchAgentsSuccessPayload {
  agents: IAgent[];
  replace: boolean;
}

export interface FetchAgentByUserIdSuccessResponse {
  status: string;
  message: string;
  data: IAgent;
}

export interface FetchAgentByUserIdSuccessPayload {
  agent: IAgent;
  userId: string;
}

export interface ReferralResposeData {
  created_at: string;
  updated_at: string;
  referred_user: ReferredUserInfo;
}

export interface ReferralRespose {
  status: string;
  message: string;
  data: Array<ReferralResposeData>;
}

export interface ReferredUserInfo extends IUserInfo {
  _id: string;
}

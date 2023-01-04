export interface ICompanyInfo {
  company_name: string;
  company_description: string;
  company_logo: string;
}
/**
 * Basic user information
 */
export interface IUserInfo {
  first_name?: string | undefined;
  last_name?: string | undefined;
  email: string;
  user_type: "Agent" | "Student" | "Support";
  created_at?: string;
  updated_at?: string;
  location?: IUpdateLocation;
  image_path?: string;
  cover_picture_path?: string;
  phone: string;
  company?: ICompanyInfo;
}

export interface IRegistration {
  full_name: string | undefined;
  first_name: string | undefined;
  last_name?: string | undefined;
  user_name?: string;
  email?: string;
  phone?: string;
  referral_code?: string;
  // passport_username?: string; 
  password: string;
  user_type: "Agent" | "Student" | "Support";
  registration_source: "email" | "phone" | "facebook" | "google";
  login_source: "email" | "phone" | "facebook" | "google";
}

export interface IUserPassword {
  password: string;
  cpassword?: string;
}

export interface IUserFormState extends IUserPassword, IUserInfo {}

export interface IStudentRegistration extends IUserInfo {
  referral_code?: string;
  password: string;
}

export interface IAgentRegistration extends IUserInfo, ICompanyInfo {
  password: string;
}

/**
 * Sign up request response against user
 */
interface IUserSignUpResponseInfo extends IUserInfo {
  created_at: string;
  updated_at: string;
  _id: string;
  verification_link: string;
  email_verified: boolean;
}

/**
 * Sign up response with user information
 */
export interface IUserSignUpResponse {
  status: string;
  message: string;
  data: IUserSignUpResponseInfo;
}

/**
 * Login request
 */
export interface ILoginRequest {
  password: string | undefined;
  email?: string | undefined;
  phone?: string | undefined;
  remember_me?: boolean;
}

/**
 * Login request with token and user information
 * In order to avoid the duplication just add role based attributes as optional keeping the common as required
 */

interface IAgentFetchInfo {
  services: [];
  total_earned: number;
  amount: number;
  total_jobs_completed: number;
  total_jobs_in_progress: number;
  created_at: string;
  updated_at: string;
  user: string;
  _id: string;
  referral_code: string;
  cover_picture_path?: string;
  company?: ICompanyInfo;
  service?: { title: string; description: string };
}
export interface ILoginResponsInfo extends IUserInfo {
  token: string;
  full_name: string | undefined;
  _id: string;
  first_name?: string | undefined;
  last_name?: string | undefined;
  user_name?: string;
  email_verified: boolean;
  phone_verified: boolean;
  agentProfile?: IAgentFetchInfo;
  info?: any;
  location?: IUpdateLocation;
}

// export interface IAgentInfo extends ILoginResponsInfo {}
/**
 * Login request with token and status
 */
export interface ILoginResponse {
  status: string;
  message: string;
  data: ILoginResponsInfo;
}
export interface IFetchUser {
  full_name: string | undefined;
  languages: string[];
  phone_verified: boolean;
  created_at: string;
  updated_at: string;
  _id: string;
  email: string;
  phone: string;
  password: string;
  user_type: string;
  first_name: string;
  last_name: string;
  verification_link: string;
  agentProfile?: IAgentFetchInfo;
  location?: IUpdateLocation;
  image_path?: string;
  email_verified?: boolean;
  phone_verifid?: boolean;
  info?: any;
  cover_picture_path?: string;
}
export interface IForgotPasswordResponse {
  status: string;
  message: string;
  data?: any; // don't know what backend dev want to do with this key
}

export interface IGeneralRequestResponse {
  status: string;
  message: string;
  data?: any; // don't know what backend dev want to do with this key
}

export interface IChangePasswordRequest {
  token: string;
  id?: string;
  password: string;
  source?: string;
}

export interface IFacebookLoginRequest {
  email?: string;

  accessToken?: string;
  name?: string;
  picture?: string;
  id: string;
  user_type: IRegistration["user_type"];
  registration_source: IRegistration["registration_source"];
}

export interface IUpdateContactInfo {
  first_name: string;
  last_name: string;
  location?: IUpdateLocation;
  company?: ICompanyInfo;
}
export interface IUpdateLocation {
  address: string;
  lat: string;
  lngs: string;
  time_zone: string;
  country: string;
  street_address: string;
  city: string;
  postal_code: string;
}

export interface IUpdatePassword {
  new_password: string;
  old_password: string;
}

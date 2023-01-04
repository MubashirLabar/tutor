import { IService } from './service.interface';

export interface ILocation {
  address: string;
  lat: string;
  lngs: string;
  time_zone?: string;
  country?: string;
  street_address?: string;
  city?: string;
  postal_code?: string;
}

export enum UserType {
  student = 'Student',
  agent = 'Agent',
  support = 'Support',
  tutor = 'Tutor'
}

export interface ICommonUser {
  _id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  temp_mail?: string;
  phone?: string;
  temp_phone?: string;
  user_type?: UserType;
  description?: string;
  location?: ILocation;
  languages?: string[];
  password?: string;
  image_path?: string;
  verification_link?: string;
  verification_code?: string;
  email_verified?: boolean;
  phone_verified?: boolean;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  validPassword?: (password: string) => boolean;
  generateJwt?: () => string;
  setPassword?: (password: string) => boolean;
  _doc?: Record<string, unknown>;
  twilio_sid?: string;
}

export interface IAttachment {
  link: string;
  document_type: string;
}

export interface IDocument {
  image_path: string;
  name: string;
}

export interface ISeller {
  services: IService[];
  total_earned: number;
  total_jobs_completed: number;
  total_jobs_in_progress: number;
}

export enum ResponseCodes {
  success = 200,
  badRequest = 400,
  internalServerError = 500
}

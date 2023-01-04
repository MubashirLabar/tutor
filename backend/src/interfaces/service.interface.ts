import { ISubject } from './';

export enum ServiceStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export interface IService {
  _id?: string;
  title?: string;
  status?: ServiceStatus;
  description?: string;
  subject?: ISubject;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

import { IUser } from './';

export enum HTTPActions {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  PUT = 'PUT'
}

export enum Access {
  READ = 'READ',
  WRITE = 'WRITE',
  EXECUTE = 'EXECUTE'
}

export interface IPermission {
  _id?: string;
  user: IUser;
  resource: string[];
  action: HTTPActions;
  access: Access;
  ownership: boolean;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

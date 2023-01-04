import { IService, ICategory } from './';

export interface ISubject {
  _id?: string;
  title: string;
  category: ICategory;
  services: IService[];
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

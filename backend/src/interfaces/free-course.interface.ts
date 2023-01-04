import { ISubject } from './subject.interface';

export interface IUploadedFile {
  title: string;
  link: string;
}

export interface IFreeCourse {
  _id?: string;
  title: string;
  tutor: string;
  subject: ISubject[];
  duration: number;
  videos: IUploadedFile[];
  other_materials: IUploadedFile[];
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

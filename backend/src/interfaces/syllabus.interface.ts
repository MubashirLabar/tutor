import { IFile } from './file.interface';
import { ISubject } from './subject.interface';

export interface ISyllabus {
  _id?: string;
  school: string;
  subjects: ISubject[];
  reference_to_books_and_solutions: IFile[];
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

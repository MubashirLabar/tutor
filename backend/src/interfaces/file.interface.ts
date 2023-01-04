export enum FileType {
  SOLUTION_MANUAL = 'SOLUTION_MANUAL',
  OTHER = 'OTHER',
  BOOK = 'BOOK'
}

export interface IFile {
  _id?: string;
  title: string;
  type: FileType;
  subject: string;
  link_to_file: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

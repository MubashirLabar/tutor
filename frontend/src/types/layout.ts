export interface ISchool {
  country: string;
  graduate_school: boolean;
  undergraduate_school: boolean;
  junior_transfer_school: boolean;
  standardized_school: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  _id: string;
}

export interface ISubject {
  title: string;
  id: string;
}

export interface ITest {
  name: string;
  _id: string;
}
export interface ISubjects {
  [key: string]: ISubject[];
}

export interface ICategory {
  _id: string;
  image_path: string;
  title: string;
  active: boolean;
}

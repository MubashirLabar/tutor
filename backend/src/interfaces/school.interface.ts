export interface ISchool {
  _id?: string;
  country: string;
  graduate_school: boolean;
  undergraduate_school: boolean;
  junior_transfer_school: boolean;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

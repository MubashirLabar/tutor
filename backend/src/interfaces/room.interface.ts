export interface IRoom {
  _id?: string;
  name: string;
  type: string;
  active: boolean;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

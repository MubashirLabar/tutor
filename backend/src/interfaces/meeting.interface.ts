import { IUser } from './';

export interface IMeeting {
  _id?: string;
  start_datetime: Date;
  end_datetime: Date;
  link_to_meeting: string;
  pass_code_to_meeting: string;
  host: IUser;
  participants: IUser[];
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

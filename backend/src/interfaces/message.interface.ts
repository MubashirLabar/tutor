import { IRoom, IUser } from './';

export interface IMessage {
  _id?: string;
  room: IRoom;
  message: string;
  sender: IUser;
  recipients: IUser[];
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

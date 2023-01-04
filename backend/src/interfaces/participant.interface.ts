import { IUser, IRoom } from './';

export interface IParticipant {
  _id?: string;
  user: IUser;
  room: IRoom;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

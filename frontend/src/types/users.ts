import { actionTypes } from "../stores/users";

export interface IUser {
  _id:string;
  id: number;
  name: string;
  username: string;
  email: string;
  twilio_sid: string;
  first_name: string;
  last_name: string;
}

export interface FetchUsersSuccessPayload {
  users: IUser[];
}

export interface queryUsersResponse {
  status: string;
  message: string;
  data: Array<queryUsersEntryResponse>;
}

export interface queryUsersEntryResponse{
  key: string;
  value: IUser
}
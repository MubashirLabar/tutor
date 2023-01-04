import { IUser } from './';
export interface IFacebook {
  _id?: string;
  facebook_id?: string;
  name?: string;
  email?: string;
  image?: {
    data: {
      height: string;
      is_silhouette: boolean;
      url: string;
      width: string;
    };
  };
  user: IUser;
  access_token?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

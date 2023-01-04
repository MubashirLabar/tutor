import { IFacebook } from '../interfaces';
import { Schema, model } from 'mongoose';

const schema = new Schema({
  facebook_id: String,
  name: String,
  email: String,
  image: {
    data: { height: String, is_silhouette: Boolean, url: String, width: String }
  },
  access_token: String,
  user: { type: Schema.Types.ObjectId, ref: 'Users' },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  deleted_at: { type: Date }
});

export const FacebookModel = model<IFacebook>('facebook', schema);

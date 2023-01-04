import { ICSUser } from '../interfaces';
import { Schema, model } from 'mongoose';

const schema = new Schema({
  created_by_agent: { type: Schema.Types.ObjectId, ref: 'Users' },
  user: { type: Schema.Types.ObjectId, ref: 'Users', unique: true },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  deleted_at: { type: Date }
});

export const CSUserModel = model<ICSUser>('CSUsers', schema);

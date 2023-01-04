import { IRoom } from '../interfaces';
import { Schema, model } from 'mongoose';

const schema = new Schema({
  name: { type: String },
  type: { type: String },
  active: { type: Boolean },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  deleted_at: { type: Date }
});

export const RoomModel = model<IRoom>('Rooms', schema);

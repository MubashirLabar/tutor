import { IMessage } from '../interfaces';
import { Schema, model } from 'mongoose';

const schema = new Schema({
  room: { type: Schema.Types.ObjectId, ref: 'Rooms' },
  message: { type: String },
  sender: { type: Schema.Types.ObjectId, ref: 'Users' },
  recipients: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  deleted_at: { type: Date }
});

export const MessageModel = model<IMessage>('Messages', schema);

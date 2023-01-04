import { IParticipant } from '../interfaces';
import { Schema, model } from 'mongoose';

const schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'Users' },
  room: { type: Schema.Types.ObjectId, ref: 'Rooms' },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  deleted_at: { type: Date }
});

export const ParticipantModel = model<IParticipant>('Participants', schema);

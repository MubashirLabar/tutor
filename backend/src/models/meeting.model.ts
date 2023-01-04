import { IMeeting } from '../interfaces';
import { Schema, model } from 'mongoose';

const schema = new Schema({
  start_datetime: { type: Date },
  end_datetime: { type: Date },
  link_to_meeting: { type: String },
  pass_code_to_meeting: { type: String },
  host: { type: Schema.Types.ObjectId, ref: 'Users' },
  participants: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  deleted_at: { type: Date }
});

export const MeetingModel = model<IMeeting>('Meetings', schema);

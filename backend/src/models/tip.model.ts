import { ITip } from '../interfaces';
import { Schema, model } from 'mongoose';

const schema = new Schema({
  amount: { type: Number },
  paid_by: { type: Schema.Types.ObjectId, ref: 'Users' },
  paid_for: { type: Schema.Types.ObjectId, ref: 'Users' },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  deleted_at: { type: Date }
});

export const TipModel = model<ITip>('Tips', schema);

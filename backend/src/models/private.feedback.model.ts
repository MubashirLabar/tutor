import { IPrivateFeedback } from '../interfaces';
import { Schema, model } from 'mongoose';

const schema = new Schema({
  ratings: { type: Number, enum: [1, 2, 3, 4, 5] },
  review: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'Users' },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  deleted_at: { type: Date }
});

export const PrivateFeedbackModel = model<IPrivateFeedback>(
  'PrivateFeedbacks',
  schema
);

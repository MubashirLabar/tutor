import { IReview, Visibility } from '../interfaces';
import { Schema, model } from 'mongoose';

const schema = new Schema({
  ratings: { type: Number, enum: [1, 2, 3, 4, 5] },
  review: { type: String },
  visibility: {
    type: String,
    enum: Object.values(Visibility),
    default: Visibility.VISIBLE
  },
  contract: { type: Schema.Types.ObjectId, ref: 'Contracts' },
  feedback_by: { type: Schema.Types.ObjectId, ref: 'Users' },
  feedback_to: { type: Schema.Types.ObjectId, ref: 'Users' },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  deleted_at: { type: Date }
});

export const ReviewModel = model<IReview>('Reviews', schema);

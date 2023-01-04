import { IQuickQuestion, QuickQuestionStatus } from '../interfaces';
import { Schema, model } from 'mongoose';

const schema = new Schema({
  title: { type: String },
  description: { type: String },
  posted_by: { type: Schema.Types.ObjectId, ref: 'Users' },
  answered_by: { type: Schema.Types.ObjectId, ref: 'Users' },
  assigned_to: { type: Schema.Types.ObjectId, ref: 'Users' },
  answer: { type: String },
  status: {
    type: String,
    enum: Object.values(QuickQuestionStatus),
    default: QuickQuestionStatus.OPEN
  },
  created_at: { type: Date, defasult: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  deleted_at: { type: Date }
});

export const QuickQuestionModel = model<IQuickQuestion>(
  'QuickQuestions',
  schema
);

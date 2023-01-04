import { IStudent } from '../interfaces';
import { Schema, model } from 'mongoose';

const schema = new Schema({
  amount: { type: Number, default: 0 },
  total_spent: { type: Number, default: 0 },
  total_hires: { type: Number, default: 0 },
  total_jobs_posted: { type: Number, default: 0 },
  interested_subjects: [{ type: String }],
  payment_method_verified: { type: Boolean, default: false },
  payment_method: { type: Schema.Types.ObjectId, ref: 'PaymentMethods' },
  free_question_available: { type: Boolean, default: true },
  free_book_solutions_available: { type: Boolean, default: true },
  history_private: { type: Boolean, default: false },
  solutions: [{ type: String }],
  attachments: [{ link: String, document_type: String }],
  user: { type: Schema.Types.ObjectId, ref: 'Users', unique: true },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  deleted_at: { type: Date }
});

export const StudentModel = model<IStudent>('Students', schema);

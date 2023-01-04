import { ISubject } from '../interfaces';
import { Schema, model } from 'mongoose';

const schema = new Schema({
  title: { type: String, unique: true },
  category: { type: Schema.Types.ObjectId, ref: 'Categories' },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  deleted_at: { type: Date }
});

export const SubjectModel = model<ISubject>('Subjects', schema);

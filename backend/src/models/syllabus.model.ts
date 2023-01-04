import { ISyllabus } from '../interfaces';
import { Schema, model } from 'mongoose';

const schema = new Schema({
  school: { type: String },
  subjects: [{ type: Schema.Types.ObjectId, ref: 'Subjects' }],
  reference_to_books_and_solutions: [
    { type: Schema.Types.ObjectId, ref: 'Files' }
  ],
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  deleted_at: { type: Date }
});

export const SyllabusModel = model<ISyllabus>('Syllabus', schema);

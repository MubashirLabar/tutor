import { IFreeCourse } from '../interfaces';
import { Schema, model } from 'mongoose';

const schema = new Schema({
  title: { type: String },
  tutor: { type: Schema.Types.ObjectId, ref: 'Users' },
  subject: { type: Schema.Types.ObjectId, ref: 'Subjects' },
  duration: { type: Number },
  videos: [{ type: Schema.Types.ObjectId, ref: 'Files' }],
  other_materials: [{ type: Schema.Types.ObjectId, ref: 'Files' }],
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  deleted_at: { type: Date }
});

export const FreeCourseModel = model<IFreeCourse>('FreeCourses', schema);

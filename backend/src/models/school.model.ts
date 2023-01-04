import { ISchool } from '../interfaces';
import { Schema, model } from 'mongoose';

const schema = new Schema({
  country: { type: String },
  graduate_school: { type: Boolean },
  undergraduate_school: { type: Boolean },
  junior_transfer_school: { type: Boolean },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  deleted_at: { type: Date }
});

export const SchoolModel = model<ISchool>('Schools', schema);

import { ICategory } from '../interfaces';
import { Schema, model } from 'mongoose';

const schema = new Schema({
  title: { type: String, unique: true },
  image_path: { type: String },
  active: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  deleted_at: { type: Date }
});

export const CategoryModel = model<ICategory>('Categories', schema);

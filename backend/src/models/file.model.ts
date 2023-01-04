import { IFile, FileType } from '../interfaces';
import { Schema, model } from 'mongoose';

const schema = new Schema({
  title: { type: String },
  type: { type: String, enum: Object.values(FileType) },
  subject: { type: String },
  link_to_file: { type: String },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  deleted_at: { type: Date }
});

export const FileModel = model<IFile>('Files', schema);

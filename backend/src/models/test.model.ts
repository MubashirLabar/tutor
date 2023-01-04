import { ITest } from '../interfaces';
import { Schema, model } from 'mongoose';

const schema = new Schema({
  name: { type: String },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  deleted_at: { type: Date }
});

export const TestModel = model<ITest>('Tests', schema);

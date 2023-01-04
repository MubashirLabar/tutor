import { ICompany } from '../interfaces';
import { Schema, model } from 'mongoose';

const schema = new Schema({
  agents: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  services: [{ type: Schema.Types.ObjectId, ref: 'Services' }],
  total_earned: { type: Number },
  total_jobs_completed: { type: Number },
  total_jobs_in_progress: { type: Number },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  deleted_at: { type: Date }
});

export const CompanyModel = model<ICompany>('Companies', schema);
